import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route, NavLink,Link,useNavigate,useLocation } from 'react-router-dom';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import axios from 'axios';
import axiosInstance from '../../api/axios';


function Staff_Profile() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const location = useLocation();
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    const { phone, name, email, username, profile_image_url } = user
      ? user
      : { name: '', email: '', username: '', phone: '', phone1: '', profile_image_url: 'path/to/placeholder_image.jpg' };
    const pro=profile_image_url
    console.log(user.phone);
    let userID=user.userID
    console.log(userID,'_____SDSD');
    console.log(user,"_____akjsndiasdnaiu_______");
    console.log(user);

    useEffect(() => {
        // Fetch user data from the backend API using axios
        axiosInstance
          .get(`/user_side/api/viewprofile/${userID}/`)
          .then((response) => {
            setUserData(response.data);
            
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, [user.userID]);
      console.log(userData);
      
      var t = userData.subscription_expiration
      console.log(t);
      var dateObject = new Date(t);
      var localizedDateString = dateObject.toLocaleDateString();
  
    
  return (
    <div>
        <Staff_Navbar/>
<section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                {userData.profile_image ?
                <img src={userData.profile_image} alt="avatar"
                  className="rounded-circle img-fluid" style={{ width: '150px' }} />
                :<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                className="rounded-circle img-fluid" style={{ width: '150px' }} />
                }
                <h5 className="my-3 mx-auto text-uppercase">{userData.username}</h5>
                
                
                <div className="d-flex justify-content-center mb-2">
                  <Link type="button" to={`/staff_profileupdate/${userID}`} className="btn btn-primary">Update</Link>
                  {/* <button type="button" className="btn btn-outline-primary ms-1">Followers</button> */}
                </div>
                <Link type="button" to={`/staff_passwordchange/${userID}`} className="btn btn-outline-primary ms-1">ChangePassword </Link>

              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">User Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.phone}</p>
                  </div>
                  
                </div>
                
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Subscription Expiry</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{localizedDateString}</p>
                  </div>
                </div>
               
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Staff_Profile