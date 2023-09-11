import React,{useEffect,useState} from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import User_Navbar from './navbar/User_NavBar';
import User_Footer from './Footer/User_Footer';
import axiosInstance from '../../api/axios';


const User_profileupdate = () => {
  // Fetch user data and user ID from localStorage
  
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const { phone,name, email,username } = user ? user : { name: '', email: '',username:'',phone:'' };
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    username:'',
    
    phone: '',
    profile_image: null,
  });
  const [userpr, setUserpr] = useState({});
  useEffect(() => {
    // Fetch user data from the backend API using axios
    axiosInstance
      .get(`user_side/api/viewprofile/${userId}/`)
      .then((response) => {
        setUserData(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        
      });
  }, [user.userId]);

  console.log(userData);
  // Load existing user data when the component mounts

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const select_img=[null]
  let ko =1
  const handleImageChange = (e) => {
     select_img[0]=e.target.files[0]
      ko = 2
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', userData.email);
    
    formData.append('username', userData.username);
    formData.append('phone', userData.phone);
    try {
      console.log('hello');
      if (ko==2) {
        console.log('hello');
        formData.append('profile_image', select_img[0]);
      }
    } catch (error) {
      console.log(error);
    }
    
    

    axiosInstance
      .patch(`/user_side/api/user-profile/${userId}/`, formData)
      .then((response) => {
        console.log(formData);
        console.log('Profile updated successfully!');
        
        toast.success('Profile updated successfully!');
        setTimeout(() => {
            navigate('/user_profile');
          }, 2000); // Delay navigation by 2 seconds (2000 milliseconds)
        
      })
      .catch((error) => {
        toast('2Mb Maximum')
        console.error('Error updating profile:', error);
        toast.error('Error updating profile!');
      });
  };

  return (
    <div>
        
    <User_Navbar/>
    <br />
    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}} >
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <form onSubmit={handleSubmit}>
      
      
      <div className="mb-3">
        <label htmlFor="username" className="form-label form-labeloo">Username</label>
        <input type="text" name="username" id="username" className="form-control form-controloo" value={userData.username} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label form-labeloo">Phone</label>
        <input type="text" name="phone" id="phone" className="form-control form-controloo" value={userData.phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="profile_image" className="form-label form-labeloo">Profile Image</label>
        <input type="file"  name="profile_image" id="profile_image" className="form-control form-controloo"  onChange={handleImageChange} />
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
    
    </div>
    
    <div>

        
    </div>
    <User_Footer/>
    </div>
    
    
  );
};

export default User_profileupdate;
