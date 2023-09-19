
import User_Navbar from './navbar/User_NavBar'
import User_Footer from './Footer/User_Footer'
import { BrowserRouter, Routes, Route, NavLink,Link,useNavigate,useLocation } from 'react-router-dom';
import React,{useEffect,useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../api/axios';
import './User_profile.css';


function User_Profile() {

    const [userData, setUserData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate({});
    const token = localStorage.getItem('token');
    const location = useLocation();
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    if (!user) {
      setTimeout(() => {
        console.log('hello');
        window.location.href = '/'; // Redirect to the root location
      }, 10);
    }
    
    
    const { phone, name, email, username, profile_image_url } = user
      ? user
      : { name: '', email: '', username: '', phone: '', phone1: '', profile_image_url: 'path/to/placeholder_image.jpg' };
    const pro=profile_image_url
    
    const userID=user.userID
    

   

    const [followingList, setFollowingList] = useState([]);
    

    
    useEffect(() => {
      // Fetch user data from the backend API
  
      // Fetch the list of followings for the user
      axiosInstance.get(`/user_side/followings/${userID}/`)
    
        .then(response => {
          setFollowingList(response.data);
          console.log(followingList,'llllls');
        })
        .catch(error => {
          console.error('Error fetching followings:', error);
        });
    }, [userID]);
  
    const handleShowModal = () => {
      setShowModal(true);
      
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setFollowingList([]);
    };

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
      
      
      var t = userData.subscription_expiration
      
      var dateObject = new Date(t);
      var localizedDateString = dateObject.toLocaleDateString();
  
      const handleUnfollowClick = (f) => {
        // console.log(f.followed_user,userID);
        axiosInstance
          .delete(`/user_side/follow/${userID}/${f.followed_user}/`)
          .then((response) => {
            if (response.status === 204) {
              setShowModal(false);
            }
          })
          .catch((error) => {
            console.error('Error unfollowing:', error);
          });
          
      };
  return (
    <div>
        <User_Navbar/>
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
                  <Link type="button" to={`/user_profileupdate/${userID}`} className="btn btn-primary">Update</Link>
                  {/* <Link type="button" to='/following' className="btn btn-outline-primary ms-1">Followings</Link> */}
                  <Button variant="outline-primary" onClick={handleShowModal}>
        View Followings
      </Button>

      
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Followings</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <ul className="following-list">
      {followingList.map((following, index) => (
        
        <li key={index} className="following-item">
          
            <div className="profile-image">
              <img
                src={following.followed_user_profile_photo}
                alt=""
              />
            </div>
          
          <div className="username">{following.followed_user_username}</div>
          <button className="unfollow-button" onClick={() => handleUnfollowClick(following)}>
            Unfollow
          </button>
        </li>
      ))}
    </ul>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>



                <Link type="button" to={`/user_passwordchange/${userID}`} className="btn btn-outline-primary ms-1">ChangePassword </Link>
                <Link type="button" to={`/user_wallet`} className="btn btn-primary ">Wallet </Link>


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
                
              
               
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    <User_Footer/>
    </div>
  )
}

export default User_Profile