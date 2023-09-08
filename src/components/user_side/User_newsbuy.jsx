import React, { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';

function User_newsbuy({  newsid }) {
  const [show, setShow] = useState(true);
  const [balance, setBalance] = useState([])
  const [news, setNews] = useState([])
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;

  const handleClose = () => setShow(false);
  const [count, setCount] = useState(0)

  useEffect(() => {
    axiosInstance
      .get(`/user_side/api/wallets/${userId}/`)
      .then((response) => {
        setBalance(response.data)
        console.log(response.data);
        console.log(newsid);
      })
      .catch('error on')
  },[])

  useEffect(() => {
    axiosInstance.get(`/user_side/api/user_newslisting/${newsid.id}/`)
      .then((response) => {
        setNews(response.data)
        console.log(response.data);
      })
  },[])


  const payment = () => {
    
    
    
    console.log(newsid.user, userId, 'asd__',newsid.id);
    
    const formData = new FormData();
    formData.append('amount', newsid.plan);
    formData.append('sender', userId);
    formData.append('receiver', newsid.user);
    
   
    
    axiosInstance
      .post('/user_side/api/wallet-transactions/', formData)
      .then((response) => {
        console.log(response.data);
        
        // Make another axios call here
        const purchaseData = {
          user: userId,
          news: newsid.id,
          
        };
        
        axiosInstance
          .post('/user_side/api/purchases/create/', purchaseData)
          .then((purchaseResponse) => {
            console.log(purchaseResponse.data);

            axiosInstance.post(`/user_side/api/walletsadd/${userId}/`,{balance:newsid.plan})
            setShow(false); // Close the modal
          })
          .catch((error) => {
            console.error('Error creating purchase:', error);
            toast('Add Some Money')
          });
      })

      .catch((error) => {
        console.error('Error making wallet transaction:', error);
      });
  };
  
  
  
  

  return (
    <>
    <ToastContainer/>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>your Balance : {balance?.balance}</h2>
          <h4>Do You want By this news</h4>
          

          <Button variant="secondary" onClick={payment}  >₹ {newsid.plan} Buy </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default User_newsbuy;
