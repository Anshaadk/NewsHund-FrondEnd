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
                                    <Link style={{color:'black' , borderColor:'black'}} className="nav-link nav-linkb active pe-3 " aria-current="page" to='/staff_dashboard'>DashBoard</Link>
                                </li>
                                <li   className="nav-item card_pop">
                                    <Link style={{color:'black' , borderColor:'black'}} className="nav-link nav-linkb px-lg-3" to='/staff_upload'>Uploads</Link>
                                </li>
                                <li   className="nav-item card_pop">
                                    <Link style={{color:'black' , borderColor:'black'}} to={'/staff_followed'} className="nav-link nav-linkb px-lg-3" href="#">Followers</Link>
                                </li>
                                <li  className="nav-item card_pop">
                                    <Link style={{color:'black' , borderColor:'black'}} className="nav-link nav-linkb px-lg-3" to='/staff_wallet'>Wallet</Link>
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