import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';


function Staff_Navbar() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
//   const location = useLocation();
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const { phone, name, email, username } = user || { name: '', email: '', username: '', phone: '' };
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    if (!user.is_staffs) {      
    setTimeout(() => {
        navigate('/');
      }, 1);
    }
    // Fetch user data from the backend API using axios
    axiosInstance
      .get(`/user_side/api/viewprofile/${userId}/`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const m = userData.is_staffs // Fixed potential undefined 'user' issue
  
//   console.log(m);



const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Set a timer to navigate after a certain delay (e.g., 2 seconds)
    setTimeout(() => {
      navigate('/staff_login');
      window.location.reload();
    }, 1); // 2000 milliseconds (2 seconds)
  };
  
  
  
  return (
    <div>
        {  m   &&

<nav>
        <div style={{backgroundColor:'#e7eadc52'}} className="container-fluid p-0 ">
            <div className="container-fluid container-lg p-0">
                <div className="textColor textColorb ">
                    <div className="row justify-content-center align-items-center mx-auto">
                        
                        
                        <div className="col-4 col-lg-3 sideLine sideLineb">
                        {/* <span className=" display-6 fw-bold py-2 text-lg-start d-none d-lg-block">News Hund</span> */}
                        </div>
                        <div className="col-4 col-lg-3 sideLine sideLineb">
                            <div className="d-flex justify-content-center align-items-center">
                                

                            </div>
                        </div>
                        
                    </div>
                </div>
                <hr className="my-0 d-lg-none"/>
 
                
                <span className=" display-2 fw-bold py-2    text-dark">News Hund</span>

                
                
                
                
                {token ?
                                <div className="d-none d-lg-block text-end"> <div class="dropdown">
                                
                               <a style={{backgroundColor:'transparent'}} className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                               {userData.profile_image ?
                               <img style={{width:'30px'}} src={userData.profile_image} alt="" />
                               :
                               <img style={{width:'30px'}} src="https://th.bing.com/th?q=Profile+Vector&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="" />
                               }
                           </a>

                           <ul class="dropdown-menu card_pop" aria-labelledby="dropdownMenuLink">
                               <li><Link className="dropdown-item card_pop" to="/staff_profile">Settings</Link></li>
                               <li><Link className="dropdown-item card_pop" onClick={handleLogout}>logout</Link></li>

                           </ul>
                        
                           </div></div>
                                    
                                :
                                <div className="d-none d-lg-block"> <div class="dropdown">
                                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    LOGIN
                                </a>

                                <ul class="dropdown-menu card_pop" aria-labelledby="dropdownMenuLink">
                                    <li><Link className="dropdown-item card_pop" to="/user_login">Login</Link></li>
                                    <li><Link className="dropdown-item card_pop" to="/user_registration">Regiter</Link></li>

                                </ul>
                                </div></div>}
                           
                                    
                                

                                
                
                <div style={{backgroundColor:"white"}} className="navbarBg" data-bs-theme="dark">
                    
                    <nav style={{backgroundColor:'#e7eadc52'}} className="navbar navbar-expand-lg justify-content-center justify-content-lg-between p-0">

                        <button style={{color:'black' , borderColor:'black'}} className="navbar-toggler m-3 w-100" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span  className="navbar-toggler-icon"></span>
                            Menu
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                            <ul  className="navbar-nav navbar-navb  text-uppercase ps-3">
                                
                                <li className="nav-item card_pop ">


                                    <Link style={{color:'black' , borderColor:'black'}} className="nav-link nav-linkb active pe-3 " aria-current="page" to='/staff_dashboard'><svg  xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="12" height="12"><path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"/><path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/><path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"/><path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/></svg> &nbsp; DashBoard</Link>
                                </li>
                                <li   className="nav-item card_pop">
                                    <Link style={{color:'black' , borderColor:'black'}} className="nav-link nav-linkb px-lg-3" to='/staff_upload'><svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="12" height="12"><path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/><path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/></svg> &nbsp; Uploads</Link>
                                </li>
                                <li   className="nav-item card_pop">
                                    <Link style={{color:'black' , borderColor:'black'}} to={'/staff_followed'} className="nav-link nav-linkb px-lg-3" href="#"> <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="12" height="12"><path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"/></svg> &nbsp;Followers</Link>
                                </li>
                                <li  className="nav-item card_pop">
                                    <Link style={{color:'black' , borderColor:'black'}} className="nav-link nav-linkb px-lg-3" to='/staff_wallet'> <svg id="Layer_1" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m24 23a1 1 0 0 1 -1 1h-22a1 1 0 0 1 0-2h22a1 1 0 0 1 1 1zm-23.709-14.448a2.443 2.443 0 0 1 .153-2.566 4.716 4.716 0 0 1 1.668-1.5l7.501-3.904a5.174 5.174 0 0 1 4.774 0l7.5 3.907a4.716 4.716 0 0 1 1.668 1.5 2.443 2.443 0 0 1 .153 2.566 2.713 2.713 0 0 1 -2.416 1.445h-.292v8h1a1 1 0 0 1 0 2h-20a1 1 0 0 1 0-2h1v-8h-.292a2.713 2.713 0 0 1 -2.417-1.448zm4.709 9.448h3v-8h-3zm5-8v8h4v-8zm9 0h-3v8h3zm-16.937-2.375a.717.717 0 0 0 .645.375h18.584a.717.717 0 0 0 .645-.375.452.452 0 0 0 -.024-.5 2.7 2.7 0 0 0 -.949-.864l-7.5-3.907a3.176 3.176 0 0 0 -2.926 0l-7.5 3.907a2.712 2.712 0 0 0 -.949.865.452.452 0 0 0 -.026.499z"/></svg> &nbsp;Wallet</Link>
                                </li>
                                
                                
                               
                                
                            </ul>
                            <div className="text-white m-1 p-3">
                            <Link style={{color:'black' , borderColor:'black'}} to='/' type="button" className="btn getBtn getBtnb border border-white rounded-0 card_pop">Go To Home</Link>

                                <Link style={{color:'black' , borderColor:'black'}} to='/staff_chat' type="button" className="btn getBtn getBtnb border border-white rounded-0 card_pop">Chat</Link>
                            </div>
                        </div>
                        
                    </nav>
                    
                </div>
            </div>
        </div>

    </nav>

}

    </div>
                        
  )
}

export default Staff_Navbar