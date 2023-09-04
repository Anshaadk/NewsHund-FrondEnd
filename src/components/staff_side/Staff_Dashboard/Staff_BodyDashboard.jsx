import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './staff_dashbord.css';
import axiosInstance from '../../../api/axios';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

function Staff_BodyDashboard() {
  const [earningsData, setEarningsData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [followers, setFollowers] = useState([]);
  
  const userJSON = localStorage.getItem('user');
  const userId = userJSON ? JSON.parse(userJSON).userID : null;

  useEffect(() => {
    // Fetch earnings data
    axiosInstance
      .get(`user_side/api/staff_newsearnning_dashboard/${userId}/`)
      .then(response => {
        setEarningsData(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching earnings data:', error);
      });

    // Fetch payment data
    axiosInstance
      .get(`user_side/api/staff_paymentdashbord/${userId}/`)
      .then(response => {
        setPaymentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching payment data:', error);
      });

    // Fetch user followers data
    axiosInstance
      .get(`user_side/api/viewprofile/${userId}/`)
      .then(response => {
        setFollowers(response.data.followers_count);
      })
      .catch(error => {
        console.error('Error fetching followers data:', error);
      });
  }, [userId]);

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <h3>Earnings Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="payment_date" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: '#333', border: 'none' }}
              formatter={(value, name, props) => [`${value} rs`, 'Earnings']}
              labelFormatter={(label) => `Date: ${label}`}
              itemSorter={(item) => -item.value}
              content={(props) => {
                const { payload } = props;
                if (payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return (
                    <div className="custom-tooltip">
                      <p>Amount: {data.amount} rs</p>
                      {data.sender && <p>Sender: {data.senders.username}</p>}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Payment Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transaction_date" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: '#333', border: 'none' }}
              formatter={(value, name, props) => [`${value} rs`, 'Payment']}
              labelFormatter={(label) => `Date: ${label}`}
              itemSorter={(item) => -item.value}
              content={(props) => {
                const { payload } = props;
                if (payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return (
                    <div className="custom-tooltip">
                      <p>Date: {data.transaction_date}</p>
                      <p>Amount: {data.amount} rs</p>
                      <p>Plan: {data.plan}</p> {/* Assuming 'plan' is a property in your data */}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      

      {/* Add more chart sections or data display as needed */}
    </div>
  );
}

export default Staff_BodyDashboard;
