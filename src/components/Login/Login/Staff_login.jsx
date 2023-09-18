import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../api/axios';

function Staff_login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // -----------------------------------Google--------------------
  
  
         
  
  // ---------------------------end-----------------------------------------

  const gLogin = async (accessToken) => {
    try {
      const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSuccessCallback = (codeResponse) => {

    setUser(codeResponse);
    gLogin(codeResponse.access_token);
  };

  const onErrorCallback = (error) => {
    console.log('Login Failed:', error);
  };

  const login = useGoogleLogin({
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });
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
            if (response.data.user.is_staffs) {
              navigate('/staff_dashboard');
              console.log('if');
            } else {
              console.log(response.data, 'else');
              navigate('/staff_Payment');
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
    <div>
    <br />
    <br />
<div className="container containers">
    
    <div className="d-flex justify-content-center align-items-center flex-wrap">
        <form action="" onSubmit={handleSubmit}>
        <div className="form-card form-cards">
            <div className="cards">
                <div style={{overflow:'hidden'}}  className="card-head bg-white">
                    <p className="m-0 text-center fs-08">Login in with </p>
                    <div className="d-flex align-items-center justify-content-center my-2">
                    <div className="btn btn-default mx-3"
 
 onClick={login}
> 
  
    <img
      type='btn' style={{width:'20px',height:'20px'}}
      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
      alt=""
    />
    <span>Google</span>
  
</div>
                    </div>
                </div>
                <div className="card-form card-forms">
                    <p className="text-center text-muted fs-08 mt-3">Author Login</p>
                    <div style={{padding:'2px'}} className="d-flex align-items-center input-field">
                        <span className="far fa-envelope text-muted">&nbsp;&nbsp;</span>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        </div>

                        <div style={{padding:'2px'}} className="d-flex align-items-center input-field">
                        <span className="fas fa-key text-muted">&nbsp;&nbsp;</span>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        </div>

                    <div className="d-flex align-items-center">
                        
                    </div>
                    <div className="d-flex justify-content-center">
                    <div className="btn btn-primary mt-3" onClick={handleSubmit}>Sign In</div>

                        

                    </div>
                    <br />
                    &nbsp;
                &nbsp;

                    <Link to="/user_registration"
                style={{
                    
                    color: 'black',
                    
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';

                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';

                }}
                className='btn'>
               Register</Link>
                
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                
                <Link to="/user_login"
                style={{
                    
                    color: 'black',
                    
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';

                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';

                }}
                className='btn'>
                    User
                </Link>


                </div>
            </div>
            
        </div>
        </form>
    </div>
</div>


<ToastContainer />
</div>
  )
}

export default Staff_login