import React, { useEffect, useState } from 'react';
import './User_Navbar.css';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Notification from '../Notification';
import { Form, FormControl, Button } from 'react-bootstrap';
import axiosInstance from '../../../api/axios';
import { useDispatch } from 'react-redux'
import filterNews, { addFilternews, removeFilterNews } from '../../../redux/slice/filterNews';



function User_Navbar() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const { phone, name, email, username } = user || { name: '', email: '', username: '', phone: '' };
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsdata, setNewsdata] = useState()
  const [categories, setCategories] = useState([]);
  const [heddername, setHeddername] = useState('Flash news');
  const [cat,setCat]=useState(false)

  const dispatch = useDispatch()
    
  const [selectedTab, setSelectedTab] = useState('home'); // Initialize with 'home'

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  useEffect(() => {
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

 

  useEffect(() => {
    // Fetch news data
    axiosInstance
      .get('/user_side/api/user_newslisting/')
      .then((response) => {
        setNewsdata(response.data);
        console.log('News data:', response.data);
        dispatch(removeFilterNews(response.data)); // Move this line here
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
      });

    // Fetch categories data
    axiosInstance
      .get('/user_side/api/categories/')
      .then((response) => {
        setCategories(response.data);
        console.log('Categories data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

//   console.log(userData, "jaskdjhsabd_____ASDASDAD________");


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/user_login');

   
  };

  const serchnews = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    
      const searchedNews = newsdata.filter(
        (news) =>
          news.subject.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(addFilternews(searchedNews));
      setHeddername('Search Results');
   
  };
  
  
 const removeFnews =()=>{
    dispatch(removeFilterNews(newsdata))
 }
  const category_filter = (cat) => {

    setHeddername(cat)
    const filteredNews = newsdata.filter((e) => e.category_name === cat);
    console.log(filteredNews);
    

    // Dispatch the filtered news array to Redux
    dispatch(addFilternews(filteredNews))
  }

  const maxCategoriesToShow =5;
  

  return (
    <>
        <nav 
      
    >
      
        <div style={{backgroundColor:'#e7eadc52'}} className="container-fluid p-0 ">
            
            <div className="container-fluid container-lg p-0">
                <div  className="textColor textColorb ">
                    <div className="row justify-content-center align-items-center mx-auto">
                        <div className="col-12 col-lg-3 p-0">
                            <div  className="display-3 fw-bold py-2 text-center text-lg-start d-none d-lg-block"><img  className='logoimg '/></div>
                            
                            
                        </div>
                        
                        <div  className="col-4 col-lg-3 sideLine sideLineb">
                            
                        <span className="display-6 fw-bold py-2 text-lg-start d-none d-lg-block text-primary">
  {heddername}
</span>

                        </div>
                        <div className="col-4 col-lg-3 sideLine sideLineb">
                            <div className="d-flex justify-content-center align-items-center">
                                

                            </div>
                        </div>
                        <div className="col-4 col-lg-3">
                            <div className="d-flex justify-content-center align-items-center">
                                <a href="#">
                                    <div className="me-3 p-2 py-3"></div>
                                </a>
                                {token ?
                                <div className="d-none d-lg-block"> <div class="dropdown">
                                
                               <a style={{backgroundColor:'transparent'}} className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                               {userData.profile_image ?
                               <img style={{width:'30px'}} src={userData.profile_image} alt="" />
                               :
                               <img style={{width:'30px'}} src="https://th.bing.com/th?q=Profile+Vector&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="" />
                               }
                           </a>

                           <ul class="dropdown-menu card_pop" aria-labelledby="dropdownMenuLink">
                               <li><Link className="dropdown-item card_pop" to="/user_profile">Settings</Link></li>
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
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-0 d-lg-none"/>
 
                <div className=" display-3 fw-bold mb-2 d-lg-none"><img className='logoimg'/>
                <span className=" display-2 fw-bold py-2    text-primary">Flash News</span>
                {token ? 
                <div class="dropdown text-end">
                    
                    <a style={{backgroundColor:'transparent'}} className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                               <img style={{width:'30px'}} src="https://th.bing.com/th?q=Profile+Vector&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="" />
                           </a>
                                

                           <ul class="dropdown-menu " aria-labelledby="dropdownMenuLink">
                               <li><Link className="dropdown-item " to="/user_profile">Settings</Link></li>
                               <li><Link className="dropdown-item " onClick={handleLogout}>logout</Link></li>

                           </ul>
                                </div>
                                :
                                <div class="dropdown text-end">
                    
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    LOGIN
                                </a>
                                

                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><Link className="dropdown-item " to="/user_login">Login</Link></li>
                                    <li><Link className="dropdown-item " to="/user_registration">Regiter</Link></li>

                                </ul>
                                </div>
                                }
                                
                                </div>

                                
                
                <div style={{borderRadius:'7px' }} className="navbarBgDark" data-bs-theme="dark">
                  
                

                    <nav className="navbar navbar-expand-lg justify-content-center justify-content-lg-between p-0">

                        <button style={{color:'white' , borderColor:'white'}} className="navbar-toggler m-3 w-100" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span  className="navbar-toggler-icon"></span>
                            Menu
                        </button>
                        



                        <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                          
                        {cat ?
                            <ul className="navbar-nav navbar-navb text-uppercase ps-3">
                            
                                <li className="nav-item ">
                                    <Link className="nav-link nav-linkb active pe-3 " onClick={(()=>{removeFnews(),setHeddername('Flash News'),setCat(false)})} aria-current="page" to='/'>Go Back</Link>
                                </li>
                                {categories?.slice(0, maxCategoriesToShow).map((e) => (
                <li className="nav-item" key={e.id}>
                  <a
                    className="nav-link nav-linkb px-lg-3"
                    onClick={() => category_filter(e.cat_name)}
                    href="#"
                  >
                    {e.cat_name}
                  </a>
                </li>
              ))}

              {categories.length > maxCategoriesToShow && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link nav-linkb dropdown-toggle px-lg-3"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul className="dropdown-menu card_pop">
                    {/* Render additional categories in the More dropdown */}
                    {categories.slice(maxCategoriesToShow).map((e) => (
                      <li key={e.id}>
                        <a
                          className="dropdown-item"
                          onClick={() => category_filter(e.cat_name)}
                          href="#"
                        >
                          {e.cat_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
                                
                            </ul>
:
<ul className="navbar-nav custom-nav-links text-uppercase ps-3">
<li className="nav-item">
  <NavLink
    to="/"
    className="nav-link"
    activeClassName="active"
    onClick={()=>{
      {cat? setCat(false):setCat(true)}
       
    }}
  >
    Home
  </NavLink>
</li>
{ userId &&
<li className="nav-item">
  <NavLink
    to="/suggestions"
    className="nav-link"
    activeClassName="active"
  >
    Suggestions
  </NavLink>
</li>
}
</ul>
}
                            <div className="text-white m-1 p-3">
                                
                            <br />
                            {user?.is_staffs &&
                            <Link type="button" to='/staff_dashboard' className="btn primary getBtnb">Go To Auther</Link>
}
                            &nbsp;
                              

      <Notification   showModal={showModal} setShowModal={setShowModal} />
      &nbsp;
   
                                {userId?
                                <Link type="button" to='/chat/' className="btn primary getBtnb">Chat</Link>
:''}    
                            </div>
                        </div>
                        
                    </nav>
                    
                
                </div>
                <Form inline className="mx-lg-auto">
  <div className="search-bar-wrapper">
    <FormControl
      type="text"
      placeholder="Search"
      className="mr-sm-2"
      value={searchQuery}
      onChange={
        serchnews
      }
    />
  </div>
</Form>




            </div>
            
        </div>

    </nav>
    
    
    </>
  );
}

export default User_Navbar;
