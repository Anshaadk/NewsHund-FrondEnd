import React, { useState } from 'react';
import axios from 'axios';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

function Staff_passchange() {
  // Fetch user ID from localStorage
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { current_password, new_password, confirm_new_password } = passwordData;

    axiosInstance
      .put(`/user_side/api/change-password/${userId}/`, {
        current_password,
        new_password,
        confirm_new_password,
      })
      .then((response) => {
        console.log('Password changed successfully');
        toast.success('Password updated successfully!');
        setTimeout(() => {
            navigate('/staff_profile');
          }, 2000); // Delay navigation by 2 seconds (2000 milliseconds)
        
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        toast.error('Error updating Password!');
      });
  };

  return (
    <div>
      <Staff_Navbar />

      <div style={{ width: '70%', position: 'absolute', left: '120px' }}>
        <h2>Password Change</h2>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <label htmlFor="current_password" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              className="form-control"
              value={passwordData.current_password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new_password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              className="form-control"
              value={passwordData.new_password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_new_password" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirm_new_password"
              id="confirm_new_password"
              className="form-control"
              value={passwordData.confirm_new_password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Staff_passchange;
