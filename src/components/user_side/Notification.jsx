import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './Notification.css'

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const [newsdata, setNewsdata] = useState([]);
    const [userPnews, setUserpnews] = useState([]);
    const navigate=useNavigate()
    const userToken = localStorage.getItem('token');
    const userJSON = localStorage.getItem('user');
    const userId = userJSON ? JSON.parse(userJSON).userID : null;

    useEffect(() => {
        if (userToken && userId) {
            axiosInstance
                .get(`/user_side/api/notification/${userId}/`)
                .then(response => {
                    setNotifications(response.data);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                });
        }
    }, [userToken, userId]);

    useEffect(() => {
        axiosInstance
            .get(`/user_side/api/user_newslisting/`)
            .then(response => {
                setNewsdata(response.data);
                
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
            });
    }, []);

    // Function to map notifications to news titles
    const navigateToSinglePage = (newsId) => {
      console.log(newsId);
      
      if (newsId.plan =='Free') {
        navigate(`/singlepage/${newsId.id}`);
      }else{
        navigate('/')
      }
      setShow(false)
  };

  // Function to map notifications to news titles
  const renderNotifications = () => {
    let k =1
    return newsdata.map((news, index) => {
        const matchingNotification = notifications.find(notification => notification.message === news.id);
        if (matchingNotification) {
            return (
                <li
                    className={`notification-item ${news.plan !== 'Free' ? 'restricted' : ''}`}
                    key={news.id}
                    onClick={() => navigateToSinglePage(news)}
                >
                    <div className="notification-content">
                        <div className="notification-number"></div>
                        
                        <div className="notification-image">
                            <img src={news.photo1} alt={news.subject} />
                        </div>
                        <div className="notification-text">{news.subject}</div>
                        {news.plan !== 'Free' && (
                            <span className="restricted-badge">Restricted Content</span>
                        )}
                    </div>
                </li>
            );
            
        }
        return null;
    });
};


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn getBtn getBtnb border border-white rounded-0" onClick={handleShow}>
                Notification
            </Button>

            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header  >
                    <Modal.Title >Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                    {renderNotifications()}
                </Modal.Body >
                <Modal.Footer >
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Notification;
