import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Payment_success() {
  const { paymentId, amount, formattedDate } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Use setTimeout to delay the redirection after 3 seconds
    const redirectionTimeout = setTimeout(() => {
      navigate('/staff_dashboard');
    }, 3000); // 3000 milliseconds (3 seconds)

    // Clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(redirectionTimeout);
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-success">Payment Success!</h2>
              <p className="card-text">Payment ID: {paymentId}</p>
              <p className="card-text">Amount: ₹{amount}</p>
              <p className="card-text">Date: {formattedDate}</p>

              {/* Text indicating redirection */}
              <p>Redirecting to staff dashboard in 3 seconds...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment_success;
