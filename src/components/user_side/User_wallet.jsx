import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User_Navbar from './navbar/User_NavBar';
import './User_wallet.css';

import { loadRazorpay } from '../staff_side/razorpay-utils';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../api/axios';

function User_wallet({ match }) {
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Adjust the page size as needed
  const [totalPages, setTotalPages] = useState(1);
  const [topUpAmount, setTopUpAmount] = useState(0);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Fetch user-based wallet information
        const walletResponse = await axiosInstance.get(`user_side/api/wallets/${userId}/`);
        setBalance(walletResponse.data.balance);

        // Fetch user transactions
        const transactionResponse = await axiosInstance.get(`user_side/api/transactions/${userId}/`);
        const allTransactions = transactionResponse.data;

        // Calculate total pages based on the page size
        const calculatedTotalPages = Math.ceil(allTransactions.length / pageSize);
        setTotalPages(calculatedTotalPages);

        // Calculate the range of transactions to display on the current page
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;
        const transactionsToDisplay = allTransactions.slice(startIndex, endIndex);

        // Update the transactions state with the transactions to display
        setTransactions(transactionsToDisplay);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the function to fetch data
    fetchWalletData();
  }, [userId, currentPage, pageSize]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  const handleTopUp = async () => {
    try {
      if (topUpAmount <= 0) {
        alert('Invalid amount');
        return;
      }
  
      const csrftoken = getCookie('csrftoken');
  
      // Create a Razorpay order for wallet top-up
      console.log(topUpAmount);
      const response = await axiosInstance.post(
        '/user_side/api/topupcreate_order/', // Replace with your actual endpoint
        { topUpAmount: topUpAmount }, // Convert to paise
        { headers: { 'X-CSRFToken': csrftoken } }
      );
  
      if (response.status === 200) {
        const data = response.data;
  
        // Load Razorpay script dynamically
        await loadRazorpay();
  
        // Create a new Razorpay instance for wallet top-up
        const razorpay = new window.Razorpay({
          key: 'rzp_test_aCOPLFUFmC265M', // Replace with your actual Razorpay API key
          amount: data.amount,
          currency: 'INR',
          name: 'Wallet Top-Up',
          description: 'Wallet Top-Up Payment',
          order_id: data.order_id, // Replace with the order ID received from the backend
          handler: async function (response) {
            console.log('Payment successful:', response);
            // You can handle the success response here (e.g., show a success message)
  
            // Update wallet balance after successful top-up
            try {
              const walletTopUpResponse = await axios.post(
                `http://localhost:8000/user_side/api/walletsadd/${userId}/`,
                { balance: topUpAmount },
                { headers: { 'X-CSRFToken': csrftoken } }
              );
              toast(`TopUp completed : ₹ ${topUpAmount} `)
              window.location.reload();
              if (walletTopUpResponse.status === 200) {
                const walletTopUpData = walletTopUpResponse.data;
                console.log('Wallet balance updated:', walletTopUpData);
                
                
  
                // Clear topUpAmount input after successful top-up
                setTopUpAmount(0);
              }
            } catch (error) {
              console.error('Error updating wallet balance:', error);
            }
          },
          prefill: {
            // Use user's pre-filled information here
          },
        });
  
        // Open the Razorpay payment window for wallet top-up
        razorpay.open();
      }
    } catch (error) {
      console.error('Error processing wallet top-up:', error);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  

  return (
    
    <>
     
    <User_Navbar/>
      {/* Header */}
      {/* <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">My Wallet</a>
        </div>
      </header> */}

      {/* Main Content */}
      <ToastContainer/>
      <main className="wallet-container">
  <div className="wallet-card">
    <h2 className="wallet-heading">Welcome to Your Wallet!</h2>
    <p className="current-balance">
      Current Balance: ${balance}
    </p>

    {/* Top-up Input */}
    <div className="top-up-section">
      <input
        type="number"
        className="top-up-input"
        onChange={(e) => setTopUpAmount(Number(e.target.value))}
        placeholder="Enter amount to top up"
      />
      <button className="top-up-button" onClick={handleTopUp}>
        Top-up
      </button>
    </div>

    {/* Transaction History */}
    <div className="transaction-history">
      <h4>Transaction History</h4>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`transaction-item ${transaction.amount > 0 ? 'received' : 'sent'}`}
          >
            <span className="transaction-icon">
              {transaction.amount > 0 ? '📤' : ' 📥'}
            </span>
            {Math.abs(transaction.amount)}{' '}
            {transaction.amount > 0 ? 'send' : 'recived'} To Purchase{' '}
            <span className="username">{transaction.receivers.username}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Pagination */}
    <div className="pagination">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous Page
      </button>
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next Page
      </button>
    </div>
  </div>
</main>

    </>
  );
};

export default User_wallet;
