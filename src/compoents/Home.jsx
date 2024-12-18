import Biography from "./Biography";
import doctorImage from "../assets/nur.png";

import Department from "./Departmnet";
import Hero from "./Hero";
import Message from "./Message";
import LeftDepartment from "./DepartmnetLeft";

function Home() {
  return (
    <>
      <div className="Home">
        <Hero
          data={{
            imgUrl: doctorImage,
            title:
              "Welcome to Pinnacle Medical instittue | Your Trusted Healtcase provider",
          }}
        ></Hero>

      

        <div className="speciality">
            <LeftDepartment></LeftDepartment>
             <Department></Department>

        </div>

       
        <Message></Message>
      </div>
    </>
  );
}

export default Home;
