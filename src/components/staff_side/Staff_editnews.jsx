import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

function Staff_editNews() {
  const baseURL=import.meta.env.VITE_SOME_KEY
  const { id } = useParams();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [plan, setPlan] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [selectingCategory,setSelectingCategoy]=useState()
  
  const [shortDetails, setShortDetails] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  // console.log(user);
  
  useEffect(() => {
    // Fetch the existing news item data using the news ID
    axiosInstance
    
      .get(`user_side/api/news/${id}/`)
      .then((response) => {
        console.log(response.data,'_asjb___Asjk');
        const { subject, category, subcategory,fullDescription,shortDetails,plan,photo1,photo2 } = response.data;
        // console.log(response.data);
        setSubject(subject);
        setFullDescription(response.data.full_description)
        setShortDetails(response.data.short_details)
        setSelectedCategory(category);
        setSelectedSubcategory(subcategory);
        setPlan(plan);
        setPhoto1(photo1);
        setPhoto2(photo2);
        setSelectingCategoy(response.data.category)
       
      })
      .catch((error) => {
        console.error('Error fetching news item:', error);
      });
      // console.log(id);
    // Fetch categories from the backend
    axiosInstance.get('user_side/api/categories/')
    .then((response) => {
      const data = response.data;
      setCategories(data);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);

      
     
    }
    
    );
    
  // Fetch subcategories from the backend
  axiosInstance
  .get('user_side/api/subcategories/')
    .then((response) => {
      const data = response.data;
      setSubcategories(data);
    })
    .catch((error) => {
      console.error('Error fetching subcategories:', error);
    });
  }, [id]);

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };


  const handleUpdate = () => {
    // Create a FormData object
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('short_details', shortDetails);
    formData.append('full_description', fullDescription);

    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategory);
    
    

    // Send a PATCH request to the backend to update the news item
    axiosInstance
      .patch(`/user_side/api/news/${id}/`, formData)
      .then((response) => {
        console.log('News item updated:', id);
        navigate('/staff_upload'); // Navigate back to the news list after successful update
      })
      .catch((error) => {
        console.error('Error updating news item:', error);
      });
  };

  const handleSubmit = (event) => {
    

    event.preventDefault();
    
    handleUpdate();
  };
  

  return (
    <div className="container">
      <h1>Edit News Item</h1>
      <form className="mt-5" onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo1">Photo Adding Place 1</label>
          <input
  type="file"
  className="form-control-file"
  id="photo1"
  name="photo1"
  onChange={(e) => setPhoto1(e.target.files[0])}  // Corrected setPhoto1
/>
        </div>
        <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea
              className="form-control"
              type="text"
              
              
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
            ></textarea>
          </div>
        <div className="form-group">
          <label htmlFor="photo2">Photo Adding Place 2</label>
          <input
  type="file"
  className="form-control-file"
  id="photo2"
  name="photo2"
  onChange={(e) => setPhoto2(e.target.files[0])}  // Corrected setPhoto2
/>
        </div>
        <div className="form-group">
            <label htmlFor="details">Short Details</label>
            <textarea
              className="form-control"
              type="text"
              
              value={shortDetails}
              onChange={(e) => setShortDetails(e.target.value)}
            ></textarea>
          </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            name="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectingCategoy(e.target.value);
            }}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.cat_name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            className="form-control"
            name="subcategory"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Select a SubCategory</option>
            {subcategories
  .filter((subcategory) => subcategory.category == selectingCategory)
  .map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.sub_category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default Staff_editNews;
