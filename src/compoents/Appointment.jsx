import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Wrapper } from "../store/contextApi";
import { useNavigate } from "react-router-dom";
import { helperFun } from "../logics/appointment";

function Appointment() {
  const { isAuthenticated, SetAuthenticated } = useContext(Wrapper);
  const navigate = useNavigate();
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  
  const [IsDocSelected, SetIsDocSelected] = useState(false);

  useEffect(() => {
   
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const [Doc, setDoc] = useState([]);
  const { Depart, setDepart } = useContext(Wrapper);
  const [FetchingDone, setFethingDone] = useState(false);
  function changeHandle(e) {
  
    const selectedDoctorsList =
      Depart.find((dept) => dept._id === e.target.value)?.doctorsList || [];
     
    setDoc(selectedDoctorsList);
  }

  // getting list of departments
  useEffect(() => {
    async function fun() {
    
      try {
        const resData = await axios.get(
          "http://localhost:4200/api/v1/user/department",
          {
            withCredentials: true,
            headers: { "Content-Type": "httpOnly" },
          }
        );
      
        setDepart(resData.data.department);
        setFethingDone(true);
      } catch (error) {
       
      }
    }
    fun();
  }, []);

  const handleChange = (e) => {
    setSelectedDate(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    function convertMinutesTo24Hour(minutes) {
      // Get total hours and ensure it's within 24 hours
      const hours = Math.floor(minutes / 60) % 24;

      // Remaining minutes
      const remainingMinutes = minutes % 60;

      return { hours, minutes: remainingMinutes }; // Return as an object
    }

    // Example usage
    const totalMinutes = 1010; // Example input (1010 minutes past midnight)

    const [hours, minutes] = selectedTime.split(":").map(Number); // Extract IST hours and minutes

    // Create a Date object in local time (IST)
    let yearX = selectedDate.getFullYear();
    let monX = selectedDate.getMonth();
    let dateZ = selectedDate.getDate();
    let minX = hours * 60 + minutes;
    

    const localDate = new Date(yearX, monX, dateZ, hours, minutes);
    

    
    const data = {
      sehedule: {
        date: localDate.toISOString(),
        time: selectedTime,
      },
      doctorId: selectedDoctor,
    };

    await axios
      .post("http://localhost:4200/api/v1/appointment", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        alert("Appointment successfully booked!");
        navigate("/history");
      })
      .catch((error) => {
        alert("Error booking appointment, please try again.");
      
      });
  };
  const todayDate = new Date().toISOString().split("T")[0];
  // Update available slots when the date or doctor changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
     
      helperFun(selectedDoctor, selectedDate, setTimeOptions, Doc);
    }
  }, [selectedDoctor, selectedDate]);

  const handleDoctorChange = (e) => {
    const doctorID = e.target.value;
    SetIsDocSelected(true);
    setSelectedDoctor(doctorID);
  };
  function isDateAllowed(dateX) {
    
    const doctor = Doc.find((doctorX) => doctorX._id == selectedDoctor);
   
    let arrDay = null;
    for (let index = 0; index < doctor.timetable.length; index++) {
      const element = doctor.timetable[index];
      (element);
    }
    const daysMapping = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    // Convert the doctor's available days to numbers
    const availableDays = doctor.timetable.map((dayX) => {
      return daysMapping[dayX.day];
    });

    const dayOfWeek = dateX.getDay(); // Sunday = 0, Monday = 1, etc.

    // Check if the day is in the doctor's allowed days
    return availableDays.includes(dayOfWeek);
  }
  function handelSelectefTime(e) {
   
    setSelectedTime(e.target.value);
  }

  return (
    <>
      {FetchingDone ? (
        <form onSubmit={handleSubmit} className="AppointForm">
          <div>
            <select
              name="department"
              defaultValue={"select dep"}
              onChange={changeHandle}
              className="com-select"
            >
              <option value="">select Department</option>
              {Depart.map((i) => {
                return <option value={i._id}>{i.name}</option>;
              })}
            </select>
          </div>
          <div>
            <select
              name="doctor"
              className="com-select"
              onChange={handleDoctorChange}
            >
              {IsDocSelected ? (
                <option value="" disabled>
                  Select Doctor
                </option>
              ) : (
                <option value="">Select Doctor</option>
              )}
              {Doc.map((val) => {
                return <option value={val._id}>{val.firstName}</option>;
              })}
            </select>
          </div>
          <div>
            <label>Select Date:</label>
            <br />
            {IsDocSelected ? (
              <DatePicker
                selected={selectedDate}
                name="appointmentDate"
                onChange={handleChange}
                dateFormat="EEEE, MMMM d, yyyy"
                minDate={todayDate}
                required
                placeholderText="Click to select a date"
                filterDate={isDateAllowed}
                className="date-picker"
              />
            ) : (
              <DatePicker
                selected={selectedDate}
                name="appointmentDate"
                onChange={handleChange}
                dateFormat="EEEE, MMMM d, yyyy"
                minDate={todayDate}
                required
                placeholderText="Click to select a date"
                filterDate={isDateAllowed}
                disabled
              />
            )}
          </div>
          <div>
            <label>Available Time Slot </label>
            <br />
            <select
              value={selectedTime || ""}
              onChange={handelSelectefTime}
              placeholder="Select time"
              // Disable taken slots
              className="com-select"
            >
              <option value="" disabled>
                Select time
              </option>
              {timeOptions.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  disabled={option.isDisabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit">Book Appointment</button>
          </div>
        </form>
      ) : (
        <div>wait</div>
      )}
    </>
  );
}

export default Appointment;
