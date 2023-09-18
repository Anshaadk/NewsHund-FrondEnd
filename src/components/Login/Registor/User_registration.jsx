import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../Modal';
import './User_registration.css'; 
import axiosInstance from '../../../api/axios';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';



function User_registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [sendedotp, setSendedotp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError(false); 
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  
    setPasswordError(password !== value || value.trim() === '');

  };

  //-----------------------------------otp modal---------------

    

  const handleOpenModal = () => {
      setIsModalOpen(true);
    };

  const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
      if (otp === sendedotp){

        const data = {
          name: username,
          email: email,
          password: password,
        };
        
        try {
          const response = await axiosInstance.post('/user_side/register/', data);
          if (response.status === 201) {
        toast.success('Sign up successful!');
        setIsModalOpen(false);
        navigate('/user_login');
          }
        }
        catch (error) {
          toast.error('Sign up Failed')
        };
      }
      else{
      toast.error('OTP Is Not Valid!')
    }
    };

  const handleResendOtp = () => {
        toast.success('OTP Resended')
    };

  //----------------------------end-------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if  (!username || !email || !password || !confirmPassword) {
        {
      alert('Please fill in all fields.')
      return
    }
}
  
    if (password !== confirmPassword) {
      toast.error('Passwords does not match!');
      setPasswordError(true); 
      return;
    }
  
    const data = {
      name: username,
      email: email,
      password: password,
    };

    

    console.log(data,'-----------------------data-----------------s');
  
    try {
      const response = await axiosInstance.post('/user_side/sendotp/', data);
  
      // Handle success response
      if (response.status === 201) {

        console.log(response.data,'-------------------------signup-------------------');

        setSendedotp(response.data)

        setIsModalOpen(true);

        // toast.success('Sign up successful!');
        // Redirect to login page or perform other actions
        // navigate('/login');
      }
    } catch (error) {
      console.log(error.response.data,'---------------------------error--------------------------------');
      if (error.response.status === 400 && error.response.data.message === 'Email is already registered') {
        toast.error(error.response.data.message);
      } else if(error.response.status === 400 && error.response.data.message === 'Email is Not Found!'){
        toast.error('Email is Not Found!');
      }
      else{
        toast.error('Sign up failed.');
      }
      console.error('Error:', error);
    }
  };
  return (
    <div className=''>
<br />
<div className="container containers">
        <div className="d-flex justify-content-center align-items-center flex-wrap">
            <form action="" onSubmit={handleSubmit}>
            <div className="form-card">
                <div className="card ">
                    
                    <div  className="">
                        <p className="text-center text-muted fs-08 mt-3"> User Register  </p>
                        <div  className='d-flex justify-content-center'>
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
                            <br />
                            
                        <div style={{padding:'2px'}} className="d-flex align-items-center input-field">
                        &nbsp;<span className="fas fa-at text-muted">&nbsp;&nbsp;&nbsp;</span>
                            
                            <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />&nbsp;
                        </div>
                        <div style={{padding:'2px'}} className="d-flex align-items-center input-field">
                        &nbsp;<span className="fas fa-user text-muted">&nbsp;&nbsp;&nbsp;</span>
                            <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />&nbsp;
                   
                        </div >
                        <div style={{padding:'2px'}} className="d-flex align-items-center input-field">
                        &nbsp;<span className="far fas fa-key text-muted">&nbsp;&nbsp;&nbsp;</span>
                            <input 
                  type="password"
                  className='form-control'
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />&nbsp;
                
                        </div>
                        <div style={{padding:'2px'}} className="d-flex align-items-center input-field">
                        &nbsp; <span className="fas fa-retweet text-muted">&nbsp;&nbsp;&nbsp;</span>
                            
                            <input 
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />&nbsp;
                        </div>
                        
                        <div className="d-flex justify-content-center">
                            <button type='submit' className="btn btn-primary mt-3">Submit</button>
                            

                        </div>
                        <br />
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
                    Login
                    </Link>
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
                    
                    <Link to="/staff_login"
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
                        Creaters
                    </Link>

                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal-box" >
      <div className="modal-content"  onClick={(e) => e.stopPropagation()}>
        <h2 className="">Enter The OTP</h2>
        <input
          className='otp-input'
          type='text'
          placeholder="OTP"
          value={otp}
          onChange={handleOtpChange}
          onClick={(e) => e.stopPropagation()} // Prevents click from propagating
          required
        />
        <div className="submit-btn">
          <button
            className='btn-resend'
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
          <button
            className='btn-submit'
            onClick={handleOtpSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </div>
</Modal>


      <ToastContainer />

    </div>
  )
}

export default User_registration
