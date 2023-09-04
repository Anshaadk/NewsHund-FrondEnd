import React, { useEffect, useState } from 'react';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import axiosInstance from '../../api/axios';

function Staff_Followers() {
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axiosInstance.get(`user_side/followers/${userId}/`)
      .then(response => {
        setFollowers(response.data);
      })
      .catch(error => {
        console.error('Error fetching followers:', error);
      });
  }, [userId]);

  const handleUnfollowClick = (followingUserId) => {
    axiosInstance
      .delete(`/user_side/follow/${followingUserId}/${userId}/`)
      .then(response => {
        if (response.status === 204) {
          // Filter out the unfollowed user from the followers list
          setFollowers(prevFollowers => prevFollowers.filter(follower => follower.following_user !== followingUserId));
        }
      })
      .catch(error => {
        console.error('Error unfollowing:', error);
      });
  };

  return (
    <div>
      <Staff_Navbar />
      <br />
      <div className='d-flex justify-content-center'>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {followers.length > 0 ? (
  followers.map(follower => (
    <tr key={follower.id}>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={`http://localhost:8000/${follower.followed_user_profile_photo}`}
            alt={follower.followed_user_username}
            className="rounded-circle profile-image"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{follower?.following_user_username}</p>
            <p className="text-muted mb-0">{follower.following_user_email}</p>
          </div>
        </div>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary btn-sm btn-rounded"
          onClick={() => handleUnfollowClick(follower.following_user)}
        >
          Unfollow
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="2">
      <p className="text-center">No followers</p>
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff_Followers;
