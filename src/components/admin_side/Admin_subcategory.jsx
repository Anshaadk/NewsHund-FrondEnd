import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Admin_Navbar from './Admin_Navbar';
import axiosInstance from '../../api/axios';
import { Modal, Button } from 'react-bootstrap';

export default function Admin_Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [editedSubCategoryName, setEditedSubCategoryName] = useState('');
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, [modalShow]);

  const fetchSubcategories = async () => {
    try {
      const response = await axiosInstance.get('/user_side/api/subcategories_viewset/');
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/user_side/api/categories_viewset/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openEditModal = async (id) => {
    try {
      const response = await axiosInstance.get(`/user_side/api/subcategories_viewset/${id}/`);
      setEditingSubCategory(response.data);
      setEditedSubCategoryName(response.data.sub_category);
      setSelectedCategoryId(response.data.category);
      setModalShow(true);
    } catch (error) {
      console.error('Error fetching subcategory for editing:', error);
    }
  };

  const openAddModal = () => {
    setEditingSubCategory(null); // Clear editing mode when adding a new subcategory
    setNewSubCategoryName('');
    setSelectedCategoryId('');
    setModalShow(true);
  };

  const closeEditModal = () => {
    setEditingSubCategory(null);
    setModalShow(false);
  };

  const handleInputChange = (event) => {
    setEditedSubCategoryName(event.target.value);
  };

  const handleNewSubCategoryChange = (event) => {
    setNewSubCategoryName(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCategoryId) {
        console.error('Category is required.');
        return;
      }

      if (editingSubCategory) {
        // Editing an existing subcategory
        if (!editedSubCategoryName) {
          console.error('Subcategory name is required.');
          return;
        }

        const editedData = { sub_category: editedSubCategoryName, category: selectedCategoryId };
        await axiosInstance.patch(`/user_side/api/subcategories_viewset/${editingSubCategory.id}/`, editedData);
      } else {
        // Adding a new subcategory
        if (!newSubCategoryName) {
          console.error('Subcategory name is required.');
          return;
        }

        const newData = { sub_category: newSubCategoryName, category: selectedCategoryId };
        await axiosInstance.post('/user_side/api/subcategories_viewset/', newData);
      }

      // Update the state or refetch data to reflect the changes
      // Close the modal
      closeEditModal();
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  return (
    <>
      <Admin_Navbar />
      <div className="admin-category-container">
        <br /><br />
        <Button variant="primary" onClick={openAddModal}>
          Add New Subcategory
        </Button>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Subcategory</th>
              <th scope='col'>Category</th>
              <th scope='col'>Edit</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {subcategories.map(subcategory => (
              <tr key={subcategory.id}>
                <th scope='row'>{subcategory.id}</th>
                <td>{subcategory.sub_category}</td>
                <td>
                  {subcategory.category
                    ? categories.find(category => category.id === subcategory.category)?.cat_name
                    : 'N/A'}
                </td>
                <td>
                  <Button variant="primary" onClick={() => openEditModal(subcategory.id)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      <Modal show={modalShow} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSubCategory ? 'Edit Subcategory' : 'Add New Subcategory'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSubCategory ? (
            <div>
              <label className="subcategory-label">Editing subcategory:</label>
              <input
                className="subcategory-input"
                type="text"
                value={editedSubCategoryName}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div>
              <label className="subcategory-label">New subcategory:</label>
              <input
                className="subcategory-input"
                type="text"
                value={newSubCategoryName}
                onChange={handleNewSubCategoryChange}
              />
              <label className="subcategory-label">Select a category:</label>
              <select
                className="category-select"
                value={selectedCategoryId}
                onChange={handleCategorySelect}
              >
                <option value="">Select a category...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.cat_name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingSubCategory ? 'Save Changes' : 'Add Subcategory'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
