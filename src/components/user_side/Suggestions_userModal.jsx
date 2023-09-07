import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../../api/axios';

function Suggestions_userModal({ userId, followuser }) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isFollowing, setIsFollowing] = useState(false);

    const followed = followuser
    console.log(followed.id, 'adajsndjnasjndanskdn')
    useEffect(() => {

        axiosInstance
            .get(`/user_side/follow/${userId}/${followuser.id}/`)
            .then((response) => {
                if (response.status === 200) {
                    setIsFollowing(response.data.is_followed);
                }
            })
            .catch((error) => {
                console.error('Error fetching follow status:', error);
            });

    });


    const handleFollowClick = () => {
        axiosInstance
            .post(`/user_side/follow/${userId}/${followuser.id}/`)
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
            .delete(`/user_side/follow/${userId}/${followed.id}/`)
            .then((response) => {
                if (response.status === 204) {
                    setIsFollowing(false);
                    console.log(response.status === 204, 'yes');
                }
            })
            .catch((error) => {
                console.error('Error unfollowing:', error);
            });
    };



    return (

        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{backgroundColor:'white'}} closeButton>

                </Modal.Header>
                <Modal.Body>

                    
                        <div class="row">
                            <div class="col-md-12">
                                <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                                    <table class="table manage-candidates-top mb-0">
                                        <thead>
                                            <tr>
                                                <th>Authors</th>

                                            </tr>
                                        </thead>
                                        <tbody>




                                            <tr class="candidates-list">

                                                <td class="title">
                                                    <div class="thumb">
                                                        <img class="img-fluid" src={followed.profile_image} alt="" />
                                                    </div>
                                                    <div class="candidate-list-details">
                                                        <div class="candidate-list-info">
                                                            <div class="candidate-list-title">
                                                                <h5 style={{color:'black'}} class="mb-0"><a href="#">{followed.username}</a></h5>
                                                            </div>
                                                            <div class="candidate-list-option">
                                                                <ul class="list-unstyled">
                                                                    <li><i class=""></i>Contritubed Auther</li>
                                                                    <li><i class=""></i>For New News Update and Suggection follow</li>
                                                                </ul>
                                                            </div>
                                                            {userId ? (
                                                                !isFollowing ? (
                                                                    <button style={{borderColor:'black'}}
                                                                        type="button"
                                                                        className="btn btn-primary px-3"
                                                                        onClick={handleFollowClick}
                                                                    >
                                                                        Follow
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-secondary px-3"
                                                                        onClick={handleUnfollowClick}
                                                                    >
                                                                        Unfollow
                                                                    </button>
                                                                )
                                                            ) : (
                                                                <p>Please log in to follow this user.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    





                </Modal.Body>
               
            </Modal>
        </>
    );
}

export default Suggestions_userModal;