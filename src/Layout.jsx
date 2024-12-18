import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../src/assets/pngegg.png";

import { useContext, useEffect, useState } from "react";

import { Wrapper } from "./store/contextApi";
import Department from "./compoents/Departmnet";
import Footer from "./compoents/footer";
import Cookies from "js-cookie";

import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { NavLogic } from "./logics/navbarLogic";

function Layout() {
  const { setUser, User, isAuthenticated, SetAuthenticated } =
    useContext(Wrapper);
  const { GetAutheticated } = NavLogic();
  const [fetch, setFetch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fun() {
       await GetAutheticated();
      console.log("lay:", isAuthenticated);
      setFetch(false);
    }
    fun();
  }, []);
  console.log("3");
  if (fetch) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }
  async function handleLogOut() {
    try {
      const resX = await axios.get(
        "http://localhost:4200/api/v1/user/patient/logout",
        { withCredentials: true }
      );
      console.log("res---", resX);
      if (resX.data.success) {
        SetAuthenticated(false);
        navigate("/login");
      }

      return;
    } catch (error) {
      console.log(error);
    }
  }
  //Pinnacle
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light fixed-top">
        <div className="container-fluid" id="nav1">
          <a className="navbar-brand" href="#">
            <img id="logo" src={logo} alt="" width="65px" />
            <span className="Pinnacle-Healthcare">Pinnacle Healthcare</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Appointment
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/appointment">
                      New Appointmnet
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/history">
                      Appointment History
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  speciality
                </a>
                <ul className="dropdown-menu">
                  <div>
                    <Department></Department>
                  </div>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>

              <li className="nav-item">
                {isAuthenticated ? (
                  <Link>
                    <button onClick={handleLogOut}>Logout</button>
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <button>Login</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
