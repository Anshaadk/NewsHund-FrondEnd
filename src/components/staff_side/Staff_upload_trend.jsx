import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Staff_Navbar from './Staff_Navbar/Staff_Navbar';
import axiosInstance from '../../api/axios';

function Staff_upload_trend() {
  const [newsList, setNewsList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const location = useLocation();
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const { name, email, username, userID } = user ? user : { name: '', email: '', username: '', userID: '' };

  // Fetch news from backend
  useEffect(() => {
    const userId = userID;
    axiosInstance
      .get(`/user_side/api/trend_news/?id=${userId}`)
      .then((response) => {
        setNewsList(response.data);
        setFilteredNewsList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, [userID]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredNews = newsList.filter((news) =>
      news.short_banner.toLowerCase().includes(query)
    );

    setFilteredNewsList(filteredNews);
  };
 
  console.log(newsList);



  return (
    <div>
      <br />
      <Staff_Navbar />
      <div className='nav-buttons-container'>
            <Link style={{width:'30%'}} type="button" to='/staff_upload' class="btn  btn-lg  border-dark">Normal</Link>
            <Link style={{width:'30%'}} type="button" to='/staff_upload_trend' class="btn   btn-lg border-dark">Trending</Link> 
           </div >
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
          <Link
            style={{ width: '10%' }}
            type='button'
            to='/staff_trendnewsadding'
            className='btn-primary  card_pop btn-lg border-primary  '
          >
            ADD
          </Link>
      <div className='d-flex justify-content-center'>
        <div style={{ width: '75%' }} className='d-flex justify-content-center'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Subject</th>
                <th scope="col">Date</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredNewsList.map((news) => (
                <tr key={news.id}>
                  <td>{news.id}</td>
                  <td>{news.short_banner}</td>
                  <td>{news.date}</td>
                  <td>
                  <Link to={`/staff_trend_edit/${news.id}`}>
        <button className='card_pop btn btn-dark'>
          Edit
        </button>
                    </Link>


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

export default Staff_upload_trend;
