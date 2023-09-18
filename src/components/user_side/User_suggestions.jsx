import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import User_Navbar from "./navbar/User_NavBar";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import User_newsbuy from "./User_newsbuy";
import Suggestions_userModal from "./Suggestions_userModal";

export default function User_suggestions() {
 
  const [newsdata, setNewsdata] = useState([]);

  const [userPnews, setUserpnews] = useState();
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState();
  const [modalProps, setModalProps] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Adjust the number of users per page
  const [followingList, setFollowingList] = useState([]);



    
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of followings for the user
        const followingResponse = await axiosInstance.get(`/user_side/followings/${userId}/`);
        const followingData = followingResponse.data;
        setFollowingList(followingData);
        
        console.log('Followings:', followingData);
  
        // Fetch trending news data
        const newsResponse = await axiosInstance.get("/user_side/api/user_newslisting/");
        const newsData = newsResponse.data;
  
        // Sort the data by total_view in descending order
        const sortedTrendnews = newsData.sort((a, b) => b.total_view - a.total_view);
  
        // Filter the newsdata based on the user IDs in the followingList
        const filteredNewsData = sortedTrendnews.filter((news) =>
          followingData.some((following) => following.followed_user === news.user)
        );
  
        setNewsdata(filteredNewsData);
        console.log("Trending news data:", filteredNewsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [userId]);
  


  // console.log(followingList,newsdatas,'as');

  useEffect(() => {
    // Fetch user data from the API
    axiosInstance
      .get("/user_side/api/userlisting/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`user_side/api/purchases/${userId}/`)
      .then((response) => {
        setUserpnews(response.data);
      });
  }, [userId]);

  const handlePnewsClick = (newsId) => {
    if (modal) {
      setModal(false);
    }
    setSelectedNews(newsId);
    console.log(newsId);
    setModal(true);
  };

  const handleNewsClick = (news) => {
    axiosInstance
      .get(`user_side/api/news/${news.id}/`)
      .then((response) => {
        if (response.status === 200) {
          navigate(`/singlepage/${news.id}`);
        } else {
          throw new Error("Failed to increment view count");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const followmod = (user) => {
    if (show) {
      setShow(false);
    } else {
      // Set modal props here
      setModalProps(user);
      setShow(true);
    }
  };

  // Calculate the indexes for the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Map the currentUsers for display
  const renderedUsers = currentUsers
    .filter((e) => e.is_staffs)
    .map((user) => (
      <tr key={user.id} className="candidates-list">
        <td className="title">
          <div className="thumb">
            {user.profile_image ? (
              <img
                className="img-fluid"
                src={user.profile_image}
                alt=""
              />
            ) : (
              <img
                className="img-fluid"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />
            )}
          </div>
          <div className="candidate-list-details">
            <div className="candidate-list-info">
              <div className="candidate-list-title">
                <h5 style={{ color: "black" }} className="mb-0">
                  <br />
                  {user.username ? (
                    <a
                      style={{ color: "black" }}
                      className="text-capitalize"
                      href="#"
                    >
                      {user.username}
                    </a>
                  ) : (
                    <a
                      style={{ color: "black" }}
                      href="#"
                      className="text-capitalize"
                    >
                      {user.email}
                    </a>
                  )}
                </h5>
              </div>
              <div className="candidate-list-option">
                <ul className="list-unstyled">
                  <br />
                  <button
                    style={{ backgroundColor: "greenyellow" }}
                    className="btn"
                    onClick={() => {
                      followmod(user);
                    }}
                  >
                    View
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </td>
      </tr>
    ));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <User_Navbar />
      <br />
      <br />
      <MDBContainer className=" d-flex">
        <div style={{ width: "68%" }}>
          {newsdata?.map((e) => (
            <div
              key={e.id}
              className={` card_pop  ${
                e.plan === "Free" || userPnews?.some((pe) => pe.news === e.id)
                  ? "free-card"
                  : "premium-card"
              }`}
            >
              {e.plan === "Free" || userPnews?.some((pe) => pe.news === e.id) ? (
                <img
                  onClick={() => handleNewsClick(e)}
                  style={{ borderRadius: "10px" }}
                  src={e.photo1}
                  className="card-img-top"
                  alt="..."
                />
              ) : (
                <div className="position-relative">
                  <img
                    onClick={() => {
                      handlePnewsClick(e);
                      if (modal) {
                        setModal(false);
                      }
                    }}
                    style={{ borderRadius: "30px", filter: "blur(8px)" }}
                    src={e.photo1}
                    className="card-img-top"
                    alt="..."
                  />

                  <div className="overlay text-center position-absolute top-50 start-50 translate-middle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    <p className="m-0">{e.plan}</p>
                  </div>
                </div>
              )}

              <span className="view-count">
                <i className="fa fa-eye" aria-hidden="true"></i> {e.view_count}
              </span>
              <div className="card-body">
                <div className="rating-level">
                  {Array.from(
                    { length: Math.floor(Number(e.average_rating)) },
                    (_, index) => (
                      <span key={index} className="star filled-star">
                        ★
                      </span>
                    )
                  )}
                  {Array.from(
                    { length: 5 - Math.floor(Number(e.average_rating)) },
                    (_, index) => (
                      <span
                        key={index + Math.floor(Number(e.average_rating))}
                        className="star empty-star"
                      >
                        ☆
                      </span>
                    )
                  )}
                  <span className="average-rating">
                    <span className="average-rating-value">
                      {e.average_rating}
                    </span>
                  </span>
                </div>

                {e.plan === "Free" ? (
                  <p className="card-text">{e.subject}</p>
                ) : (
                  e.subject
                )}
              </div>
              <br />
            </div>
          ))}

          {modal ? <User_newsbuy newsid={selectedNews} /> : ""}
        </div>
        <div style={{ width: "30%" }}>
          <div class="container mt-3 mb-4">
            <div class="row">
              <div class="col-md-12">
                <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                  <table class="table manage-candidates-top mb-0">
                    <thead>
                      <tr>
                        <th>Authors</th>
                      </tr>
                    </thead>
                    <tbody>{renderedUsers}</tbody>
                  </table>
                  <div class="text-center mt-3 mt-sm-3">
                    <ul class="pagination justify-content-center mb-0">
                      <li class="page-item disabled">
                        {" "}
                        <span class="page-link">Prev</span>{" "}
                      </li>
                      {Array.from({
                        length: Math.ceil(users.length / usersPerPage),
                      }).map((pageNumber, index) => (
                        <li
                          class={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          key={index}
                        >
                          <button
                            class="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li class="page-item">
                        <button
                          class="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={
                            currentPage ===
                            Math.ceil(users.length / usersPerPage)
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {show ? (
            <Suggestions_userModal userId={userId} followuser={modalProps} />
          ) : null}
        </div>
      </MDBContainer>
    </>
  );
}
