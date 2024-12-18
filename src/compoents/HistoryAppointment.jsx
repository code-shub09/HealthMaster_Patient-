import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import Upcoming from "./upcoming";
import Expire from "./ExpireAppoint";
import { Wrapper } from "../store/contextApi";
import { useNavigate } from "react-router-dom";
import {NavLogic} from '../logics/navbarLogic.js'

function HistoryAppoint() {
  const [fetching, setFetching] = useState(false);
  const [UpcomingAppoint,setUpcomingAppoint]=useState([]);
  const [ExpireAppoint,setExpireAppoint]=useState([]);
  const { isAuthenticated, SetAuthenticated } = useContext(Wrapper);
  const {GetAutheticated}=NavLogic();
  const navigate=useNavigate();



  useEffect(()=>{
    if (!isAuthenticated) {
 
      navigate("/login");
    }

  },[isAuthenticated]);
  

  
  useEffect(() => {
   
    GetAutheticated();
    
    async function fun() {
      try {
        const res = await axios.get("http://localhost:4200/api/v1/appointment/history", {
          withCredentials: true,
          headers: { "Content-Type": "httpOnly" },
        });
        const UpcomingAppointment = res.data.data.UpcomingAppoint;
      
        const ExpireAppointment = res.data.data.ExpireAppoint;
        setUpcomingAppoint(UpcomingAppointment);
        setExpireAppoint(ExpireAppointment);
        setFetching(true);
       

      } catch (error) {
        // console.log(error);
      }
    }
    fun();
  },[]);


  const [selectedButton, setSelectedButton] = useState("Upcoming");
  function handleExpire(e){

    setSelectedButton('Expire')
    const buttons = Array.from(document.getElementsByClassName('butt'));
    buttons.forEach((button) => {
      button.classList.remove('activeX');
    });
    e.target.classList.add('activeX');
    return;
  }
  function handleUpcoming(e){

    const buttons = Array.from(document.getElementsByClassName('butt'));
    buttons.forEach((button) => {
      button.classList.remove('activeX');
    });
    e.target.classList.add('activeX');
    setSelectedButton('Upcoming')
    return;
  }

  return (
    <>
      {fetching ? (
        <div className="history">
          <h2>My Booking</h2>

          <div className="history-option">
            <button className='butt activeX' onClick={handleUpcoming}>Upcoming</button>
            <button className='butt' onClick={handleExpire}>
              Expire
            </button>
          </div>

          <div className="history-appointXY">
            {selectedButton == "Upcoming" ? (
              <Upcoming  UpcomingAppointment={UpcomingAppoint}></Upcoming>
            ) : (
              <Expire ExpireAppointment={ExpireAppoint}></Expire>
            )}
          </div>
        </div>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
}

export default HistoryAppoint;
