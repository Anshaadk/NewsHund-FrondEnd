import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { loadRazorpay } from './razorpay-utils'; // Replace this with the path to your Razorpay utility file
import axiosInstance from '../../api/axios';

function Staff_payment() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState([]);
  
  
  const handleSubscription = async (e) => {
    e.preventDefault();

    
  

    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');

    // Fetch name, email, and userID from localStorage
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    const { name, email, userID } = user ? user : { name: '', email: '', userID: null };

    try {
      const response = await axiosInstance.post(
        '/user_side/api/create_order/',
        { plan: selectedPlan },
        { headers: { 'X-CSRFToken': csrftoken } }
      );

      if (response.status === 200) {
        const data = response.data;
        const m=data.amount/100
        // Load Razorpay script dynamically
        await loadRazorpay();

        // Create a new Razorpay instance
        const razorpay = new window.Razorpay({
          key: 'rzp_test_aCOPLFUFmC265M', // Replace with your actual Razorpay API key
          amount: data.amount, // Amount in paise (e.g., 1000 paise = ₹10)
          currency: 'INR', // Replace with your desired currency code
          name: 'NewsHund', // Replace with your company name
          description: 'Subscription Payment', // Replace with payment description
          order_id: data.order_id, // Replace with the order ID received from the backend
          handler: async function (response) {
            // The following function will be executed when the payment is successful
            console.log('Payment successful:', response);
            // You can handle the success response here (e.g., show a success message)

            // Pass the payment ID and selected plan to the backend
            try {
              const paymentId = response.razorpay_payment_id;
              const backendResponse = await axiosInstance.post(
                `/user_side/api/user/${userID}/subscribe/`,
                { paymentId, plan: selectedPlan },
                { headers: { 'X-CSRFToken': csrftoken } }
              );
              console.log(m,"_____________hvhgvghv______");
              // Handle the backend response as needed
              console.log('Backend response:', backendResponse.data);
              
                const formattedDate = new Date()
                navigate(`/payment_success/${paymentId}/${m}/${formattedDate}`);

              
            } catch (error) {
              console.error('Error verifying payment with backend:', error);
            }
          },
          prefill: {
            name: name, // Use the fetched name from localStorage
            email: email, // Use the fetched email from localStorage
            contact: '9876543210', // Replace with the customer's phone number
          },
        });

        // Open the Razorpay payment window
        razorpay.open();
      } else {
        console.error('Failed to create payment order:', response.statusText);
        // Optionally, you can show an error message to the user
      }
    } catch (error) {
      console.error('Error creating payment order:', error);
      // Optionally, you can show an error message to the user
    }
    
  };
 

  // Function to get the CSRF token from the cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


  return (
    <div>


      <div className="container py-4 py-xl-5">
        <div className="row mb-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Heading</h2>
            <p className="w-lg-50">
              Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.
            </p>
          </div>
        </div>
        <div>
          <div className="tab-content pt-5">
            <div className="tab-pane active" role="tabpanel" id="tab-2">
              <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body flex-grow-0 p-4">
                      <span className="badge bg-primary text-uppercase mb-2">Standard</span>
                      <h4 className="display-4 fw-bold card-title">₹199<span className="fs-3 fw-normal text-muted">/mo</span></h4>
                    </div>
                    <div className="card-footer d-flex flex-column flex-grow-1 justify-content-between p-4">
                      <div>
                        <ul className="list-unstyled">
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>One Month Subscription</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>All Features</span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn btn-primary d-block w-100" type="button" onClick={(e) => {
                        setSelectedPlan('monthly');
  handleSubscription(e); // Pass the event object to handleSubscription function
   // Update the selectedPlan state after handling the subscription
}}>
  Subscribe
</button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body flex-grow-0 p-4">
                      <span className="badge bg-primary text-uppercase mb-2">Pro</span>
                      <h4 className="display-4 fw-bold card-title">₹499<span className="fs-3 fw-normal text-muted">/mo</span></h4>
                    </div>
                    <div className="card-footer d-flex flex-column flex-grow-1 justify-content-between p-4">
                      <div>
                        <ul className="list-unstyled">
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>Six Month Subscription</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>₹695 off Plan</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>All Future</span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn btn-primary d-block w-100" type="button" onClick={(e) => {
                          setSelectedPlan('six_months');
                          handleSubscription(e); // Pass the event object to handleSubscription function
                           // Update the selectedPlan state after handling the subscription
                        }}>
                          Subscribe
                        </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <div className="card-body flex-grow-0 p-4">
                      <span className="badge bg-primary text-uppercase mb-2">Enterprise</span>
                      <h4 className="display-4 fw-bold card-title">₹899<span className="fs-3 fw-normal text-muted">/mo</span></h4>
                    </div>
                    <div className="card-footer d-flex flex-column flex-grow-1 justify-content-between p-4">
                      <div>
                        <ul className="list-unstyled">
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>Lectus ut nibh quam, felis porttitor.</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>Ante nec venenatis etiam lacinia.</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>Porta suscipit netus ad ac.</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>Morbi praesent aptent integer at.</span>
                          </li>
                          <li className="d-flex mb-2">
                            <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                              </svg>
                            </span>
                            <span>Nisl potenti ut auctor lobortis.</span>
                          </li>
                        </ul>
                      </div>
                      <button className="btn btn-primary d-block w-100" type="button" onClick={(e) => {
                    setSelectedPlan('yearly');
                    handleSubscription(e); // Pass the event object to handleSubscription function
                     // Update the selectedPlan state after handling the subscription
                  }}>
                    Subscribe
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff_payment;


