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
