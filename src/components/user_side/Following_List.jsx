import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Following_List() {
  const [followingList, setFollowingList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;

  useEffect(() => {
    // Fetch the list of followings for the user
    axiosInstance.get(`user_side/followings/${userId}/`)
      .then(response => {
        setFollowingList(response.data);
      })
      .catch(error => {
        console.error('Error fetching followings:', error);
      });
  }, [userId]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Following List</h2>
      <Button variant="outline-primary" onClick={handleShowModal}>
        View Followings
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Followings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {followingList.map((following, index) => (
              <li key={index}>{following.followed_user}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Following_List;
