import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import { Link, useLocation } from 'react-router-dom';
import './Staff_uploads.css';
import axiosInstance from '../../api/axios';

function Staff_uploads() {
  const [newsList, setNewsList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem('token');
  const location = useLocation();
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const { name, email, username, userID } = user
    ? user
    : { name: '', email: '', username: '', userID: '' };

  // Load news from backend
  useEffect(() => {
    const userId = userID;
    axiosInstance
      .get(`/user_side/api/news/user/?id=${userId}`)
      .then((response) => {
        setNewsList(response.data);
        setFilteredNewsList(response.data); // Initialize filtered list with all news
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
      
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredNews = newsList.filter((news) =>
      news.subject.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredNewsList(filteredNews);
  };

  const handleBlock = (id) => {
    axiosInstance
      .delete(`/user_side/api/news/${id}/block/`)
      .then((response) => {
        console.log('News item blocked:', id);
        setNewsList(newsList.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error blocking news item:', error);
      });
  };

  return (
    <div>
      <Staff_Navbar />
      <br />
      <nav>
        <div className='nav-buttons-container'>
          <Link
            style={{ width: '30%' }}
            type='button'
            to='/staff_upload'
            className='btn  btn-lg  border-dark'
          >
            Normal
          </Link>
          <Link
            style={{ width: '30%' }}
            type='button'
            to='/staff_upload_trend'
            className='btn   btn-lg border-dark'
          >
            Trending
          </Link>
        </div>

        <div action='' className=''>
          <Link
            style={{ width: '10%' }}
            type='button'
            to='/staff_adding'
            className='btn-primary  card_pop btn-lg border-primary  '
          >
            ADD
          </Link>

          <div className='d-flex justify-content-end'>
            <div style={{ width: '40%' }} className='input-group mb-3'>
              <input
                style={{ width: '70%' }}
                type='text'
                className='form-control form-control-lg'
                placeholder='Search Here'
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className='d-flex justify-content-center'>
        <div style={{ width: '75%' }} className='d-flex justify-content-center'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Content</th>
                <th scope='col'>Date</th>
                <th scope='col'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredNewsList.map((news) => (
                <tr key={news.id}>
                  <td>{news.id}</td>
                  <td>{news.subject}</td>
                  <td>{news.Date}</td>
                  <td>
      <Link
        className='card_pop btn btn-dark'
        to={`/staff_newsedit/${news.id}/`}
      >
        Edit
      </Link>
      <button
        className='card_pop btn btn-danger'
        onClick={() => {
          const confirmDelete = window.confirm("Are you sure you want to delete this news item?");
          if (confirmDelete) {
            handleBlock(news.id);
          }
        }}
        >
        Delete
      </button>
    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Staff_uploads;
