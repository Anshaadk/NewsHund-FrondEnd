import React, { useEffect, useState } from "react";
import './User_body.css';
import WorkImage1 from './bodyimg/work-3.jpg';
import WorkImage2 from './bodyimg/work-4.jpg';
import WorkImage3 from './bodyimg/work-5.jpg';
import User_body_inside from "./User_body_inside";
import User_body_last from "./bodyimg/user_body_last";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from "../../../api/axios";

function User_body() {
  const [trendnews, setTrendnews] = useState();
  const [show, setShow] = useState(false);
  const [modelnews,setmodalnews]=useState([]);
  

  useEffect(() => {
    axiosInstance
      .get('user_side/api/user_trendnewslisting/')
      .then((response) => {
        setTrendnews(response.data);
        console.log(response.data, "jii");
       
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
      });
  }, []);
  const l1 = Math.floor(trendnews?.length / 2);

  const handleTrendOpen = (news) => {
    
    setShow(true)
    setmodalnews(news)
    console.log(news,'ssss');
  }
    
  return (
    <>

<Modal
  show={show}
  onHide={() => setShow(false)}
  dialogClassName="modal-90w"
  aria-labelledby="example-custom-modal-styling-title"
>
  <Modal.Header closeButton>
    <Modal.Title id="example-custom-modal-styling-title">
      {modelnews.short_banner}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <img src={modelnews.photo1} alt="News Photo" className="modal-image" />
    <p>{modelnews.description}</p>
  </Modal.Body>
</Modal>
      <br />
      {/* < divs one start> */}
      <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
 


        <div>
      
      
        <h2>Banner News <span class="badge badge-secondary">New</span></h2>
<div class="container">
  <div class="row">
    {/* <!-- First Carousel --> */}
    <div class="col-lg-6">
      <div  class="user-body-wrapper">
        <div id="carouselExampleCaptions" class="carousel slide card_pop" data-bs-ride="carousel">
          <div class="carousel-inner">

          {trendnews?.slice(0, l1).map((e, index) => (
                          <div key={index} class={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <img style={{ borderRadius: '20px' }} src={e.photo1} onClick={()=>handleTrendOpen(e)} class="d-block w-100" alt="Extra Images" />
                            <div class="carousel-caption d-none d-md-block">
                              {/* <h5>First slide label</h5> */}
                              <p>S{e.short_banner}</p>
                            </div>
                          </div>
                        ))}


            {/* <div class="carousel-item">
              <img style={{borderRadius:'20px' }} src={WorkImage2} class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img style={{borderRadius:'20px' }} src={WorkImage3} class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div> */}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>


    {/* <!-- Second Carousel --> */} 
    <div class="col-lg-6">
      <div class="user-body-wrapper">
        
        <div id="carouselExample" class="carousel slide card_pop" data-bs-ride="carousel">
          <div class="carousel-inner">
          {trendnews?.slice(l1, trendnews.length).map((e, index) => (
                          <div key={index} class={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <img style={{ borderRadius: '20px' }} src={e.photo1} onClick={()=>handleTrendOpen(e)}  class="d-block w-100" alt="Extra Images" />
                            <div class="carousel-caption d-none d-md-block">
                              {/* <h5>First slide label</h5> */}
                              <p>{e.short_banner}</p>
                            </div>
                          </div>
                        ))}
            
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
      
     {/* < divs one start> */}
                  
      <br />
      <br />
      {/* < divs one start> */}
      <h1>Trending News <span class="badge badge-secondary">New</span></h1>


     <User_body_inside/>
     {/* <User_body_last/> */}

   
</div>
</div>
</div>
    </>
  );
}

export default User_body;
