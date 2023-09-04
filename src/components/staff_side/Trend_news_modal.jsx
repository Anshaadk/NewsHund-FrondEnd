import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import axiosInstance from '../../api/axios';

function Trend_news_modal(props) {
  const { show, setShow, news } = props;
  console.log(news);
  // State for form data
  const [photo1, setPhoto1] = useState(null);
  const [short_banner, setShort_banner] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const k = news.user;
    // Create a new FormData object to store the form data
    const formData = new FormData();
    formData.append('photo1', photo1);
    formData.append('short_banner', short_banner);
    formData.append('description', description);

    // Send the form data using Axios
    console.log(formData, "asim_____Asa___");

    axiosInstance
      .patch(`/user_side/api/trend_newsedit/${news.id}`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
        // Add any necessary logic here after successful submission
        // For example, you may want to close the modal or update the news list.
        handleClose();
      })
      .catch((error) => {
        console.error('Form submission failed:', error);
        // Handle the error if needed
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trending News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="photo1">Photo Adding Place 1</label>
              <input
                type="file"
                className="form-control-file"
                id="photo1"
                name="photo1"
                onChange={(e) => setPhoto1(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shortDetails">Short Details</label>
              <textarea
                className="form-control"
                id="shortDetails"
                name="short_details"
                rows="3"
                value={short_banner}
                onChange={(e) => setShort_banner(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullDescription">Details</label>
              <textarea
                className="form-control"
                id="fullDescription"
                name="full_description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-center">
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Trend_news_modal;
