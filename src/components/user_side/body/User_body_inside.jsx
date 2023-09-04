import React, { useEffect, useState } from 'react'
import './bodyimg/user_body_inside.css'

import { Link, useNavigate } from 'react-router-dom';
import User_newsbuy from '../User_newsbuy';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';

function User_body_inside() {
  const filterNews = useSelector(state=>state.FilterNews)
  console.log(filterNews,'sdfasdfasdfasdfasdfasdfasdfsdafasdf');
  const [newsdata, setNewsdata] = useState()
  const [modal, setModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState();
  const [userPnews, setUserpnews] = useState()
  const navigate = useNavigate();
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;


  useEffect(() => {
    axiosInstance
      .get(`user_side/api/purchases/${userId}/`)
      .then((response) => {
        setUserpnews(response.data)
      })
  })
  useEffect(() => {
    if (filterNews) {
      setNewsdata(filterNews.filterNewsData);
    }});

  const handleNewsClick = (news) => {
    // setSelectedNews(news);
    navigate(`/singlepage/${news.id}`);
  };

  const handlePnewsClick=(id)=>{
    setSelectedNews(id)
    console.log(id);
    setModal(true)
    modal? setModal(false):""
    
    
   
  }
  return (

    <div>
      
      <div className='row d-flex justif-content-center border-0'>
        {newsdata?.map((e) => (
          <div
            key={e.id}
            className={`card card_pop col-sm-6 col-12 border-0 col-md-6 col-lg-6 col-xl-3 mb-3 ${e.plan === 'Free' || userPnews?.some((pe) => pe.news === e.id) ? 'free-card' : 'premium-card'
              }`}
          >
            {e.plan === 'Free' || userPnews?.some((pe) => pe.news === e.id) ? (
              <img

                onClick={() => handleNewsClick(e)}
                style={{ borderRadius: '10px' }}
                src={e.photo1}
                className="card-img-top"
                alt="..."
              />
            ) : (
              <div className="position-relative">
                <img
                  onClick={()=>handlePnewsClick(e)}
                  style={{ borderRadius: '30px', filter: 'blur(8px)' }}
                  src={e.photo1}
                  className="card-img-top"
                  alt="..."
                />
                
                <div className="overlay text-center position-absolute top-50 start-50 translate-middle">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <p className="m-0">{e.plan}</p>

                </div>
              </div>

            )}
            <div className="card-body">
              {e.plan === 'Free' ? (
                <p className="card-text" > {e.subject}</p>
              ) : (
                e.subject
              )}
            </div>
            <br />
          </div>
        ))}
      </div>


      <br />
      {modal? <User_newsbuy   newsid={selectedNews} />:''}
    </div>
  )
}

export default User_body_inside