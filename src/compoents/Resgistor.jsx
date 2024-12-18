import { useState } from 'react';
import Select from 'react-select';




// Function to generate time options in 10-minute intervals
const generateTimeOptions = (start, end, interval, takenSlots) => {
    console.log('helloasddasd')
    const options = [];
    let current = start;
  
    while (current <= end) {
      const hour = Math.floor(current / 60);
      const minute = current % 60;
      const time = `${hour}:${minute < 10 ? '0' + minute : minute}`;
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hour % 12 || 12}:${minute < 10 ? '0' + minute : minute} ${period}`;
      
      const isDisabled = takenSlots.includes(time); // Check if the time slot is taken
  
      options.push({ value: time, label: formattedTime, isDisabled });
      current += interval;
    }
  
    return options;
  };

// Define time range and interval
const startTime = 9 * 60; // 9:00 AM in minutes
const endTime = 17 * 60; // 5:00 PM in minutes
const interval = 10; // 10-minute intervals
const takenSlots = ['12:00', '13:20'];

const timeOptions = generateTimeOptions(startTime, endTime, interval,takenSlots);



function Resgistor(){

  
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedTime, setSelectedTime] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ selectedTime });
    // Submit form data to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Custom Time Picker */}
      <div>
        <label>Available Time Slot (9:00 AM - 5:00 PM):</label>
        <Select
          options={timeOptions}
          value={selectedTime}
          onChange={(selectedOption) => setSelectedTime(selectedOption)}
          placeholder="Select time"
          isOptionDisabled={(option) => option.isDisabled} // Disable taken slots
        />
      </div>
      <div>
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        //   dateFormat="MMMM d, yyyy"
         dateFormat="EEEE, MMMM d, yyyy"
          placeholderText="Click to select a date"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
    

}

export default Resgistor;