import SingleAppointment from "./singleAppoint"

export default function Expire({ExpireAppointment}){

    return (
        <>
         {
            ExpireAppointment.map((appoint)=>{
                let temp=appoint.appointmentDate.date
                    const dateObj = new Date(temp);

                    
                    const dateOnly = dateObj.toISOString().split('T')[0];
                return <SingleAppointment docImg={appoint.doctorId.doctorAvtar} doctorName={(appoint.doctorId.firstName +appoint.doctorId.lastName)} date={dateOnly} time={appoint.appointmentDate.time} specaility={appoint.doctorId.department} status={appoint.status}></SingleAppointment>
            })
         }

        
        </>
    )
}