import SingleAppointment from "./singleAppoint"

export default function Upcoming({UpcomingAppointment}){
    console.log('upcome:',UpcomingAppointment)
    console.log('bjp: ',UpcomingAppointment)

    return (
        <>
         <div className="upcomingappointment-box">
              {
                 UpcomingAppointment.map((appoint)=>{
                    let temp=appoint.appointmentDate.date
                    const dateObj = new Date(temp);


                    // Get the date in YYYY-MM-DD format
                    const dateOnly = dateObj.toISOString().split('T')[0];

                     return <SingleAppointment doctorName={(appoint.doctorId.firstName +" " +appoint.doctorId.lastName)} date={dateOnly} time={appoint.appointmentDate.time} specaility={appoint.doctorId.department} docImg={appoint.doctorId.doctorAvtar} status={appoint.status}></SingleAppointment>
                 })
              }
          </div>

        
        </>
    )
}