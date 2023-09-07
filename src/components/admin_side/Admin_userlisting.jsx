import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Admin_Navbar from './Admin_Navbar';
import axiosInstance from '../../api/axios'; // Import your axios instance
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Admin_UserListing() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const token =localStorage.getItem('token')

  useEffect(() => {
    // Fetch user data from the API
    axiosInstance.get('/user_side/api/userlisting/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleBlockUser = (userId) => {
    // Make an API request to block the user
    axiosInstance
      .post(`/user_side/api/block-user/`, { user_to_block_id: userId })
      .then(response => {
        // Update the user's block status in the local state
        setUsers(prevUsers => {
          return prevUsers.map(user => {
            if (user.id === userId) {
              user.is_blocked = true;
            }
            return user;
          });
        });
      })
      .catch(error => {
        console.error('Error blocking user:', error);
      });
  };

  
  const handleUnblockUser = (userId) => {
    // Define the headers with the authentication token
    const headers = {
      Authorization: `Bearer ${token}`, // Assuming your token is formatted as a Bearer token
    };
  
    // Make an API request to unblock the user
    axiosInstance
      .post(`/user_side/api/unblock-user/`, { user_to_block_id: userId }, { headers })
      .then(response => {
        // Update the user's block status in the local state
        setUsers(prevUsers => {
          return prevUsers.map(user => {
            if (user.id === userId) {
              user.is_blocked = false;
            }
            return user;
          });
        });
      })
      .catch(error => {
        console.error('Error unblocking user:', error);
      });
  };
  



  return (
    <>
      <Admin_Navbar />
      <br />
      <div className='d-flex justify-content-center'>
        <div>
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Date of Joined</th>
                <th scope='col'>Status</th>
                <th scope='col'>Actions</th>
                {/* <th scope='col'>Block</th> */}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img
                        src={user.profile_image}
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{user.username}</p>
                        <p className='text-muted mb-0'>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='fw-normal mb-1'>{user.date_joined}</p>
                    <p className='text-muted mb-0'>{user.department}</p>
                  </td>
                  <td>
                    <MDBBadge
                      color={
                        user.is_staffs
                          ? 'success'
                          : user.is_staffs
                          ? 'primary'
                          : 'warning'
                      }
                      pill
                    >
                      {user.is_staffs ? 'Active' : 'Inactive'}
                    </MDBBadge>
                  </td>
                  <td>
                    <div
                      color='link'
                      className='card_pop'
                      onClick={() => {
                        setSelectedUser(user);
                        setModalShow(true);
                      }}
                      rounded
                      size='sm'
                    >
                      View
                    </div>
                  </td>
                  {/* <td>
                    {user.is_blocked ? (
                      <button
                        onClick={() => handleUnblockUser(user.id)}
                        className='btn btn-success'
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(user.id)}
                        className='btn btn-danger'
                      >
                        Block
                      </button>
                    )}
                  </td> */}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className='user-details'>
                
              <img
                src={selectedUser.profile_image}
                alt='User Profile'
                className='rounded-circle profile-image'
              />
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Date Joined:</strong> {selectedUser.date_joined}</p>
              <p><strong>Status:</strong> {selectedUser.is_staffs ? 'Active' : 'Inactive'}</p>
              <p><strong>Phone Number:</strong> {selectedUser.phone}</p>
              <p><strong>Follower count:</strong> {selectedUser.followers_count}</p>
              <p><strong>Following count:</strong> {selectedUser.following_count}</p>
              <p><strong>subscription_expiration:</strong> {selectedUser.subscription_expiration}</p>


              {/* Add more user information here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
