import React, { useEffect, useRef, useState } from 'react';
import User_Footer from '../components/user_side/Footer/User_Footer';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Modal } from 'react-bootstrap'; // Import the Modal component from react-bootstrap
import User_Navbar from '../components/user_side/navbar/User_NavBar';


function Singlepage() {
  const { id } = useParams(); // Extract the id parameter from the URL
  const [singlenews, setSinglenews] = useState(null);
  const [usedetails, setUserdetails] = useState(null);
  
  const apiCalledRef = useRef(false);
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState([]); // State to store comments
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');





  
  useEffect(() => {
    // Fetch the specific news item data using Axios and the id parameter
    // Replace the following API URL with the correct endpoint to fetch the news item by its id
    axiosInstance.get(`/user_side/api/user_newslisting/${id}/`)
      .then((response) => {
        setSinglenews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching news item data:', error);
      });

      

  }, [id]);



  useEffect(() => {
    // Make the user details API call only if the API hasn't been called before and singlenews is available
    if (!apiCalledRef.current && singlenews) {
      axiosInstance.get(`/user_side/api/viewprofile/${singlenews.user}/`)
        .then((response) => {
          setUserdetails(response.data);
          if (singlenews?.Date) {
            const normalizedDate = new Date(singlenews.Date).toLocaleDateString(); // Adjust the date format as needed
            setSinglenews((prev) => ({ ...prev, Date: normalizedDate }));
          }
          
          console.log(response.data);
          // Mark the API call as made to prevent multiple calls
          apiCalledRef.current = true;
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
    
    // if (usedetails) {
    //   setIsFollowing(usedetails.is_following); // Assuming the API response has a property is_following
    // }
}, [singlenews]);

useEffect(() => {
  if (userId && singlenews) {
    axiosInstance.get(`/user_side/follow/${userId}/${singlenews.user}/`)
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
  setNewComment(''); // Clear the comment input when modal is closed
};

const handleCommentSubmit = (e) => {
  e.preventDefault();

  // Make an API call to submit the new comment
  axiosInstance.post(`/user_side/api/commanting/`, {
    user:userId,
    text: newComment,
    news:id
  })
  .then((response) => {
    // Update the comments state with the new comment
    setComments([...comments, response.data]);
    setNewComment('');
    closeCommentModal(); // Close the modal after successful submission
  })
  .catch((error) => {
    console.error('Error submitting comment:', error);
  });
};

useEffect(() => {

  axiosInstance.
  get(`/user_side/api/comments/${id}/`)
    .then((response) => {
      setComments(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching comments:', error);
    });

  // ... Rest of your existing useEffect code

}, [id]);

// ... Rest of your component code


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
                <img src={"http://localhost:8000/user_side/"+usedetails?.profile_image} className="rounded-5 shadow-1-strong me-2"
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
        <button
          type="button"
          className="btn btn-primary me-1"
          onClick={openCommentModal}
        >
          <i className="fas fa-comments me-2"></i>Add comment
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
          src={`http://localhost:8000/user_side/${comment.user_profile_image}`}
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