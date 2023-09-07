import React, { useEffect, useRef, useState } from 'react';
import User_Footer from '../components/user_side/Footer/User_Footer';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Modal } from 'react-bootstrap';
import User_Navbar from '../components/user_side/navbar/User_NavBar';
import { FaStar } from 'react-icons/fa'; // Import the star icon

function Singlepage() {
  const { id } = useParams();
  const [singlenews, setSinglenews] = useState(null);
  const [usedetails, setUserdetails] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [alreadyRated, setAlreadyRated] = useState(false);
  const apiCalledRef = useRef(false);
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const baseURL=import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    axiosInstance
      .get(`/user_side/api/user_newslisting/${id}/`)
      .then((response) => {
        setSinglenews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching news item data:', error);
      });
  }, [id]);

  useEffect(() => {
    if (!apiCalledRef.current && singlenews) {
      axiosInstance
        .get(`/user_side/api/viewprofile/${singlenews.user}/`)
        .then((response) => {
          setUserdetails(response.data);
          if (singlenews?.Date) {
            const normalizedDate = new Date(singlenews.Date).toLocaleDateString();
            setSinglenews((prev) => ({ ...prev, Date: normalizedDate }));
          }
          console.log(response.data);
          apiCalledRef.current = true;
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [singlenews]);

  useEffect(() => {
    if (userId && singlenews) {
      axiosInstance
        .get(`/user_side/follow/${userId}/${singlenews.user}/`)
        .then((response) => {
          if (response.status === 200) {
            setIsFollowing(response.data.is_followed);
          }
        })
        .catch((error) => {
          console.error('Error fetching follow status:', error);
        });
    }
  }, [userId, singlenews]);

  const handleFollowClick = () => {
    axiosInstance
      .post(`/user_side/follow/${userId}/${singlenews.user}/`)
      .then((response) => {
        if (response.status === 201) {
          setIsFollowing(true);
        }
      })
      .catch((error) => {
        console.error('Error following:', error);
      });
  };

  const handleUnfollowClick = () => {
    axiosInstance
      .delete(`/user_side/follow/${userId}/${singlenews.user}/`)
      .then((response) => {
        if (response.status === 204) {
          setIsFollowing(false);
        }
      })
      .catch((error) => {
        console.error('Error unfollowing:', error);
      });
  };

  const openCommentModal = () => {
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setNewComment('');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`/user_side/api/commanting/`, {
        user: userId,
        text: newComment,
        news: id,
      })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
        closeCommentModal();
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/user_side/api/comments/${id}/`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/user_side/api/ratings/${userId}/`)
        .then((response) => {
          // Check if the user has already rated the news with the current ID
          const userRatingForNews = response.data.find((rating) => rating.news == id);
  
          if (userRatingForNews) {
            setUserRating(userRatingForNews.rating);
            setAlreadyRated(true);
          }
        })
        .catch((error) => {
          console.error('Error checking rating:', error);
        });
    }
  }, [userId, id]);
  

  const sendRating = (rating) => {
    axiosInstance
      .post(`/user_side/api/ratings/`, {
        user: userId,
        news: id,
        rating: rating,
      })
      .then((response) => {
        console.log('Rating submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting rating:', error);
      });
  };

  const handleStarClick = (rating) => {
    if (!alreadyRated) {
      setUserRating(rating);
      sendRating(rating);
    }
  };

  const renderRatingStars = () => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <FaStar
          key={i}
          className={`star-icon ${userRating >= i ? 'selected' : ''}`}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return (
      <div className="rating-stars">
        {starIcons}
        <p className="rating-label">
          {alreadyRated ? 'You have already rated this news' : 'Rate this news'}
        </p>
      </div>
    );
  };

  return (
    <div>
       <User_Navbar/>
        
        <div>
      {/* <!--Main Navigation--> */}
  <header>
    {/* <!-- Intro settings --> */}
   

    {/* <!-- Navbar --> */}
   
    {/* <!-- Navbar -->

    <!-- Jumbotron --> */}
    <div id="intro" className="p-5 text-center bg-light">
      <h1 className="mb-0 h4">{singlenews?.subject}</h1>
    </div>
    
  </header>
  
  <main className="">
    <div className="container">
      
      <div className="row">
        
        <div className="">
         
          <section className="border-bottom ">
            <img src={singlenews?.photo1} 
              className="img-fluid shadow-2-strong rounded-5 mb-4 card_pop" alt="" />

            <div className="row align-items-center mb-4">
              <div className="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
                <img src={usedetails?.profile_image} className="rounded-5 shadow-1-strong me-2"
                  height="35" alt="" loading="lazy" />
                <span> Published <u>{singlenews?.Date}</u> by</span> 
                 <a  className="text-dark"> {usedetails?.username}</a>
              </div>

              <div className="col-lg-6 text-center text-sm-end">

  {userId ? (  // If userId is defined (user is authenticated)
    !isFollowing ? (  // If not following the user
      <button
        type="button"
        className="btn btn-primary px-3"
        onClick={handleFollowClick}
      >
        Follow
      </button>
    ) : (  // If already following the user
      <button
        type="button"
        className="btn btn-secondary px-3"
        onClick={handleUnfollowClick}
      >
        Unfollow
      </button>
    )
  ) : (
    ""  // If userId is not defined (user is not authenticated)
  )}
</div>





            </div>
          </section>
         
          <section>
            

            <p><strong>{singlenews?.subject}</strong></p>

            <p>
              {singlenews?.short_details}
            </p>

            

            <br />

            <img src={singlenews?.photo2} className="img-fluid shadow-1-strong rounded-5 mb-4 card_pop"
              alt="" />

            

            <p>
              {singlenews?.full_description}
            </p>
            
          </section>
          
          <section className="text-center border-top border-bottom py-4 mb-4">
          {renderRatingStars()}
        <button
          type="button"
          className="btn btn-primary me-1 "
          onClick={openCommentModal}
        >
          <i className="fas fa-comments me-2 "></i>Add comment
        </button>
      </section>
          
      <Modal show={commentModalOpen} onHide={closeCommentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="commentText">Comment</label>
              <textarea
                className="form-control"
                id="commentText"
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
          
          

            
            <section className="border-bottom mb-3">
  <p className="text-center"><strong>Comments: {comments.length}</strong></p>

  {comments.map((comment) => (
    <div className="row mb-4" key={comment.id}>
      <div className="col-2">
        {/* Use comment user's profile image */}
        <img
          src={`${baseURL}/${comment.user_profile_image}`}
          className="img-fluid shadow-1-strong rounded-5"
          alt=""
        />
      </div>

      <div className="col-10">
        <p className="mb-2">
          <strong>{comment.user_username}</strong>
        </p>
        <p>{comment.text}</p>
      </div>
      
    </div>
  ))}
</section>


            
            

            
           
          
         
          
          
        </div>
       

      </div>
      
    </div>
  </main>
 
  
  
        </div>

        <User_Footer/>

    </div>
  )
}

export default Singlepage