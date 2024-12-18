


import React, { useState } from 'react';
import axios from 'axios';

function Message() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // State to manage form submission status
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await axios.post('http://localhost:4200/api/v1/message/send', formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      console.log(res);
      setSubmissionStatus('success');
      const temp={
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      }
      setFormData(temp);

      alert('Message has been sent !!!')
    } catch (error) {

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
          }
          console.error('Config:', error.config);
    //   console.error('Error sending message:', error);
    //   setSubmissionStatus('error');
    }
  };

  return (
    <>
      <div className="Message-container">
        <h3>Send Us A Message</h3>
        <div className="MessageBox">
          <form onSubmit={handleSubmit} className="mess-form">
            <div className="div-input">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
          {submissionStatus === 'success' && <p>Message sent successfully!</p>}
          {submissionStatus === 'error' && <p>Error sending message. Please try again.</p>}
        </div>
      </div>
    </>
  );
}

export default Message;
