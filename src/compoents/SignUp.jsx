import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    role: "Patient", // assuming default role is patient
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try { console.log('---',formData);
      const response = await axios.post("http://localhost:4200/api/v1/user/patient/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data.message)
      alert(response.data.message)
     
       // Success message from backend
       navigate('/login');
    } catch (error) {
      console.log('--fsil--',error)
      alert(error.response.data.message)
    }
  };

  return (
    <div className="register-container">
      <h2>Patient Registration</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
         
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="First Name"
            className="comZ"
          />
        </div>
        <div>
          
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Last Name"
             className="comZ"
          />
        </div>
        <div>
         
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
             className="comZ"
          />
        </div>
        <div>
          
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
             className="comZ"
          />
        </div>
        <div>
          
          <select name="gender" value={formData.gender} onChange={handleChange}   className="comZ" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="dobYY">
          <p >Date Of Birth</p>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            placeholder="Date of Birth"
            className="dobZ"
          />
        </div>
        <div>
          
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
             className="comZ"
          />
        </div>
          <button type="submit">Register</button>
       
      </form>
    </div>
  );
}

export default SignUp;
