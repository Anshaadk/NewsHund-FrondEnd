import React, { useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import './Modaltest.css'; // Import your custom CSS for styling

function Modaltest() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOtpSubmit = () => {
    toast.success('OTP Verified');
    setIsModalOpen(false);
  };

  const handleResendOtp = () => {
    toast.success('OTP Resent');
  };

  return (
    <div>
      <div className={`overlay ${isModalOpen ? 'bdee' : ''}`}></div>
      <h1 className="heading">Booking</h1>
      <button className="btn-otp" onClick={handleOpenModal}>Open OTP Verification</button>
      <BootstrapModal show={isModalOpen} onHide={handleCloseModal} centered>
        <BootstrapModal.Header closeButton className="modal-header">
          <BootstrapModal.Title className="modal-title">Enter The OTP</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form.Group controlId="otpInput">
            <Form.Label className="otp-label">OTP</Form.Label>
            <Form.Control type="text" className="otp-input" placeholder="OTP" />
          </Form.Group>
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="secondary" className="btn-resend" onClick={handleResendOtp}>
            Resend OTP
          </Button>
          <Button variant="primary" className="btn-submit" onClick={handleOtpSubmit}>
            SUBMIT
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
}

export default Modaltest;
