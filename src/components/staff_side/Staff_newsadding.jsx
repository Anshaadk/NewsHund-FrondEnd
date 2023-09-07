import React, { useState, useEffect } from 'react';
import './Staff_newsadding.css';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

function Staff_newsadding() {
  const token = localStorage.getItem('token');
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  console.log(user);
  const navigate=useNavigate();

  // Ensure that the user is not null and contains a valid user ID
   // Assuming the user object has an 'id' property
  

  const [plan, setPlan] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subject, setSubject] = useState('');
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [shortDetails, setShortDetails] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const baseURL=import.meta.env.VITE_SOME_KEY
 

  useEffect(() => {
    // Fetch categories from the backend
    axiosInstance.get('/user_side/api/categories/')
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });

  // Fetch subcategories from the backend using Axios
  axiosInstance.get('/user_side/api/subcategories/')
    .then((response) => {
      setSubcategories(response.data);
    })
    .catch((error) => {
      console.error('Error fetching subcategories:', error);
    });
}, []);

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let k=user.userID
    console.log(k,'_______');
    const formData = new FormData();
    formData.append('user',k);

    formData.append('subject', subject);
    formData.append('photo1', photo1); // Use File object for photo1
    formData.append('photo2', photo2); // Use File object for photo2
    formData.append('short_details', shortDetails);
    formData.append('full_description', fullDescription);
    formData.append('plan', plan);
    formData.append('category', event.target.category.value);
    formData.append('subcategory', event.target.subcategory.value);
    formData.append('date', new Date().toISOString());
    // Make the API call to submit the form data
    console.log(formData);
  
    fetch(`${baseURL}/user_side/api/news/`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        // Handle successful submission
        console.log('Form submitted successfully!');
        // Optionally, reset form fields after successful submission
        setSubject('');
        setPhoto1(null);
        setPhoto2(null);
        setShortDetails('');
        setFullDescription('');
        setPlan('');
        navigate('/staff_upload')
      } else {
        // Handle errors
        response.json().then((errorData) => {
          console.error('Form submission failed:', errorData);
        });
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
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
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

          <div className="form-group">
            <label htmlFor="photo2">Photo Adding Place 2</label>
            <input
              type="file"
              className="form-control-file"
              id="photo2"
              name="photo2"
              onChange={(e) => setPhoto2(e.target.files[0])}
            />
          </div>
          <div className="form-group d-flex flex-wrap align-items-center">
            <label className="mr-3">Plan Option:&nbsp;</label>
            {['Free', '10', '15', '20', '30'].map((option) => (
              <div className="form-check" key={option}>
                <input
                  type="radio"
                  className="form-check-input"
                  id={option}
                  name="plan"
                  value={option}
                  checked={plan === option}
                  onChange={handlePlanChange}
                />
                <label className="form-check-label" htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select className="form-control" name="category">
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.cat_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subcategory">Subcategory</label>
            <select className="form-control" name="subcategory">
              <option value="">Select a SubCategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.sub_category}
                </option>
              ))}
            </select>
          </div>
          {/* Hidden field to submit the user ID */}
          <input  name="user" value={user.email} />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Staff_newsadding;
