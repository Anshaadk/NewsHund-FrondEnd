import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../api/axios';

function Staff_trendnewsedit() {
  const { id } = useParams();
  // Check if the ID is being received correctly
  const token = localStorage.getItem('token');
  const navgate=useNavigate()
  const [photo1, setPhoto1] = useState(null);
  const [shortDetails, setShortDetails] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  useEffect(() => {
    // Fetch the news article data using the ID from the URL parameter

    axiosInstance
      .get(`/user_side/api/trend_news/${id}/`)
      .then((response) => {
        console.log('Response:', response.data);
        const { photo1, short_banner, description } = response.data;
        setPhoto1(photo1);
        setShortDetails(short_banner);
        setFullDescription(description);
      })
      .catch((error) => {
        console.error('Error fetching news article:', error);
      });
  }, [id, token]); // Include 'token' in the dependency array

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new FormData object to store the form data
    const formData = new FormData();
    formData.append('photo1', photo1);
    formData.append('short_banner', shortDetails);
    formData.append('description', fullDescription);

    // Send a PUT request to update the news article
    const newsId = id; // Use the id from useParams
    axiosInstance
      .patch(`/user_side/api/trend_newsedit/${newsId}/`, formData,) // Use newsId instead of match.params.id
      .then((response) => {
        console.log('News article updated:', response.data);
        navgate('/staff_upload_trend')
        // Handle successful update (e.g., show a success message)
      })
      .catch((error) => {
        console.error('Error updating news article:', error);
        // Handle error (e.g., show an error message)
        toast('please add jpg or jpeg file')
      });
  };
  
  return (
    <div>
      <Staff_Navbar/>
      <ToastContainer/>
      <h2>Edit News Article</h2>
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
          <label htmlFor="shortDetails">Short Details</label>
          <textarea
            className="form-control"
            id="shortDetails"
            name="short_details"
            
            value={shortDetails}
            onChange={(e) => setShortDetails(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="fullDescription">Details</label>
          <textarea
            className="form-control"
            id="fullDescription"
            name="full_description"
           
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Staff_trendnewsedit;
