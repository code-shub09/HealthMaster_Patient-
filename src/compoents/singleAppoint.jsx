import { MdOutlineCalendarMonth } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";

export default function SingleAppointment({doctorName,date,time,specaility,docImg,status}){
  console.log(docImg)
   console.log('st:',status)

    return(
        <>
          <div className="single-appoint">

              <div className="doctor-img-appoint">
                <img src={docImg} alt="" />

              </div>

              <div className="appoint-details">
                <h6><FaUserDoctor></FaUserDoctor> <span className="doc-name">Dr. &nbsp; {doctorName}</span></h6>
                <p><MdLocalHospital></MdLocalHospital><span>Specaility : <span className="time-date">{specaility} </span>   </span></p>
                <p> <MdOutlineCalendarMonth></MdOutlineCalendarMonth> <span>Appointment On : <span className="time-date">{date} </span>  </span> </p>
                <p> <GoClockFill></GoClockFill><span>At time : <span className="time-date">{time} </span>   </span></p>
               {status!='Pending'?(<p>{status}</p>):(<span>Pending...</span>)}
              </div>
          </div>
        
        
        </>

    )
}