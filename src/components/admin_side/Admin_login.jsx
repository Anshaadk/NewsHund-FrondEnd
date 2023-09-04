import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin_login.css';
import axiosInstance from '../../api/axios';

function Admin_login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // -----------------------------------Google--------------------
  
  
          const responseMessage = (response) => {
              console.log(response);
          };
          const errorMessage = (error) => {
              console.log(error);
          };
  
  // ---------------------------end-----------------------------------------
  
  const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
  
      const data = {
        email: email,
        password: password,
      };
  
    
      try {
          const response = await axiosInstance.post('/user_side/api/token/', data);
          console.log(response);
    
          // Handle success response
          if (response.status === 200) {
            const token = response.data.token;
            const user = response.data.user;
            // Save the token in local storage
            console.log(user,"------------------------user------------------------");
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Redirect to home page or perform other actions
            toast.success("Login Success")
            if (response.data.user.is_admin && response.data.user.is_staff) {
              navigate('/admin_dashboard');
              console.log('if');
            } else{
                navigate('/')
            }
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Handle unauthorized error response
    
            toast.error("Invalid email or password")
            console.error('Error:', error.response.data.message);
          } else {
            // Handle other errors
            toast.error("Login Failed")
            console.error('Error:', error);
          }
        }
      };

  return (
   
    <MDBContainer fluid className="p-3 my-5 h-custom">
 <ToastContainer/>
      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          
<br /><br />
<br /><br />

          <MDBInput wrapperClass='mb-4' label='Email address'
          value={email}
          onChange={handleEmailChange}
          required
           id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' value={password}
                            onChange={handlePasswordChange}
                            required
                             id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" onClick={handleSubmit} size='lg'>Login</MDBBtn>
            
          </div>

        </MDBCol>

      </MDBRow>

      

    </MDBContainer>
  );
}

export default Admin_login;