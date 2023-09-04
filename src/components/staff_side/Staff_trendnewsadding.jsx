import React, { useState, useEffect } from 'react';
import './Staff_newsadding.css';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../api/axios';

function Staff_trendnewsadding() {
  const token = localStorage.getItem('token');
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  console.log(user);
  const navigate = useNavigate();


  const [photo1, setPhoto1] = useState(null);

  const [shortDetails, setShortDetails] = useState('');
  const [fullDescription, setFullDescription] = useState('');

 

 

  const handleSubmit = (event) => {
    event.preventDefault();
    let k = user.userID;
    console.log(k, '_______');
    const formData = new FormData();
    formData.append('user', k);
    formData.append('photo1', photo1);
    formData.append('short_banner', shortDetails);
    formData.append('description', fullDescription);
    formData.append('date', new Date().toISOString());
    
    // Make the API call to submit the form data using Axios
    axiosInstance.post('/user_side/api/trend_news/create/', formData)
    .then((response) => {
      console.log('Response Status Code:', response.status);
  
      if (response.status === 201) { // Updated to handle 201 status code
        // Handle successful submission
        console.log('Form submitted successfully!');
        // Optionally, reset form fields after successful submission
        setPhoto1(null);
        setShortDetails('');
        setFullDescription('');
        navigate('/staff_upload_trend');
      } else {
        // Handle errors
        console.error('Form submission failed:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
    });
  
  };
  

  return (
    <div>
      <Staff_Navbar />
      <div className="container mt-5">
        <form className="custom-form" onSubmit={handleSubmit}>
         
          <div className="form-group">
            <label htmlFor="photo1">Photo Adding Place 1</label>
            <input
              type="file"
              className="form-control-file"
              id="photo1"
              name="photo1"
              onChange={(e) => setPhoto1(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Short Details</label>
            <textarea
              className="form-control"
              id="shortDetails"
              name="short_details"
              rows="3"
              value={shortDetails}
              onChange={(e) => setShortDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea
              className="form-control"
              id="fullDescription"
              name="full_description"
              rows="3"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
            ></textarea>
          </div>

          
          
         
        
          {/* Hidden field to submit the user ID */}
          <input name="user" value={user.email} />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Staff_trendnewsadding;
