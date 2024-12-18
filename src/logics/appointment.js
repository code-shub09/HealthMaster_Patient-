// Function to generate time options in 10-minute intervals

import axios from "axios";
const generateTimeOptions = (start, end, interval, takenSlots,selectedDate) => {
    const options = [];
    let current = start;

    while (current <= end) {
        const hour = Math.floor(current / 60);
        const minute = current % 60;
        const time = `${hour}:${minute < 10 ? '0' + minute : minute}`;
        // const period = hour >= 12 ? 'PM' : 'AM';
        // const formattedTime = `${hour % 12 || 12}:${minute < 10 ? '0' + minute : minute} ${period}`;

        const isDisabled = takenSlots.includes(time); // Check if the time slot is taken
       
        // const todayDate = new Date();
        // todayDate.setUTCHours(0, 0, 0, 0);
        // let utcDate = new Date(
        //     Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
        //   );
        const todayDate = new Date().toDateString();
        const utcDate = selectedDate.toDateString();

          
    //    utcDate=utcDate.toISOString().split("T")[0]
    //     console.log(todayDate ,"selected:",utcDate)
    //    console.log( typeof(utcDate))
    //    console.log( typeof(todayDate))

        if(utcDate==todayDate){
            const now = new Date();
            const currentHour = now.getHours(); // Current hours (0-23)
            const currentMinute = now.getMinutes(); // Current minutes (0-59)

            if (hour > currentHour || (hour === currentHour && minute >= currentMinute)) {
                options.push({ value: time, label: time, isDisabled });
            }

        }else{
            options.push({ value: time, label: time, isDisabled });

        }
       
        current += interval;
    }

    return options;
};
export default generateTimeOptions;

export const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

// //   / Define time range and interval
// const startTime = 9 * 60; // 9:00 AM in minutes
// const endTime = 17 * 60; // 5:00 PM in minutes
// const interval = 10; // 10-minute intervals
// const takenSlots = ['12:00', '13:20'];

// const timeOptions = generateTimeOptions(startTime, endTime, interval, takenSlots);

function convertTimeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
export async function helperFun(doctorID,formData,setTimeOptions,Doc) {
   console.log('sal')
   
    
    const doctor = Doc.find((doctorX) => doctorX._id == doctorID);
    console.log("dsdsdfda");
    const dayX = getDayName(formData);
    const ok=formData.getDay();
    console.log(ok)
    
    // console.log(dayX);
    let start_Time;
    let end_Time;
    console.log("sel:", doctor);
    // let ab;

    let resDay = doctor.timetable.filter((index) => index.day == dayX);
    console.log(resDay);
    start_Time = resDay[0].slots.startTime;
    end_Time = resDay[0].slots.endTime;
    let interval =null; 
    for (let index = 0; index <doctor.timetable.length; index++) {
       if(doctor.timetable[index].day==resDay[0].day){
        interval=doctor.timetable[index].duration;

       }
      
    }
    // const interval = Number(doctor.timetable.duration); 
    interval=Number(interval);
    console.log(interval,'inter') // 10-minute intervals
    // const takenSlots = ['12:00', '13:20'];
    
    if (!formData) {
      console.error("Selected date is null");
      return;
    }
    const utcDate = new Date(
      Date.UTC(formData.getFullYear(), formData.getMonth(), formData.getDate())
    );

    console.log("form (UTC):", utcDate);

    const slotData = {
      id: doctorID,
      dateX: utcDate.toISOString().split("T")[0],
    };

    const slot = await axios.post(
      `http://localhost:4200/api/v1/user/doctor/slots`,
      slotData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
   
    const takenSlots = slot.data.Xslot;
    // const timeOp = generateTimeOptions(
    //   start_Time * 60,
    //   end_Time*60,
    //   interval,
    //   takenSlots,
    //   formData
    // );

    const timeOp = generateTimeOptions(
      convertTimeToMinutes(start_Time),
      convertTimeToMinutes(end_Time),
      interval,
      takenSlots,
      formData
    );
    console.log(timeOp);
   setTimeOptions(timeOp);
   return;
   
  }


  // async function docChange(e) {
  //   console.log("adsasda");
  //   const doctorID = e.target.value;
  //   // const doctorID = doctor._id;
  //   const doctor = Doc.find((doctorX) => doctorX._id == doctorID);
  //   console.log("dsdsdfda");
  //   // console.log(doctorID);

  //   const dayX = getDayName(formData);
  //   console.log(dayX);
  //   let start_Time;
  //   let end_Time;
  //   console.log("sel:", doctor);
  //   // let ab;

  //   let resDay = doctor.timetable.filter((index) => index.day == dayX);
  //   console.log(resDay);
  //   start_Time = resDay[0].slots.startTime;
  //   end_Time = resDay[0].slots.endTime;

    
  //   const interval = 5; // 10-minute intervals
  //   // const takenSlots = ['12:00', '13:20'];
    
  //   if (!formData) {
  //     console.error("Selected date is null");
  //     return;
  //   }
  //   const utcDate = new Date(
  //     Date.UTC(formData.getFullYear(), formData.getMonth(), formData.getDate())
  //   );

  //   console.log("form (UTC):", utcDate);

  //   const slotData = {
  //     id: doctorID,
  //     dateX: utcDate.toISOString().split("T")[0],
  //   };

  //   const slot = await axios.post(
  //     `http://localhost:4200/api/v1/user/doctor/slots`,
  //     slotData,
  //     { withCredentials: true, headers: { "Content-Type": "application/json" } }
  //   );
  //   console.log("kkk", slot);
  //   const takenSlots = slot.data.Xslot;
   
  //   console.log(
  //     "start:",
  //     start_Time,
  //     "end:",
  //     end_Time,
  //     "inter:",
  //     interval,
  //     "taken:",
  //     takenSlots
  //   );
  //   const timeOp = generateTimeOptions(
  //     start_Time * 60,
  //     17 * 60,
  //     interval,
  //     takenSlots
  //   );
  //   setTimeOptions(timeOp);
  // }