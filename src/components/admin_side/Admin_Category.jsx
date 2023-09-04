import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Admin_Navbar from './Admin_Navbar';
import axiosInstance from '../../api/axios';
import { Modal, Button } from 'react-bootstrap';

export default function Admin_Category() {
  const [categories, setCategories] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    // Fetch data from the API and update categories state
    axiosInstance.get('/user_side/api/categories_viewset/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [modalShow]);

  const openEditModal = async (id) => {
    try {
      const response = await axiosInstance.get(`/user_side/api/categories_viewset/${id}/`);
      setEditingCategory(response.data);
      setEditedCategoryName(response.data.cat_name); // Set the initial value of editedCategoryName
      setModalShow(true);
    } catch (error) {
      console.error('Error fetching category for editing:', error);
    }
  };

  const openAddModal = () => {
    setNewCategoryName('');
    setModalShow(true);
  };

  const closeEditModal = () => {
    setEditingCategory(null);
    setModalShow(false);
  };

  const handleEditInputChange = (event) => {
    setEditedCategoryName(event.target.value);
  };

  const handleNewInputChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      if (!editedCategoryName) {
        console.error('Category name is required.');
        return;
      }

      const editedData = { cat_name: editedCategoryName };

      await axiosInstance.patch(`/user_side/api/categories_viewset/${editingCategory.id}/`, editedData);
      // Update the state or refetch data to reflect the changes
      // Close the modal
      closeEditModal();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleNewSubmit = async () => {
    try {
      if (!newCategoryName) {
        console.error('Category name is required.');
        return;
      }

      const newData = { cat_name: newCategoryName };

      await axiosInstance.post('/user_side/api/categories_viewset/', newData);
      // Update the state or refetch data to reflect the changes
      // Close the modal
      closeEditModal();
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  return (
    <>
    <Admin_Navbar />
     <div className="admin-category-container">
      
      <br /><br />
      <Button variant="primary" onClick={openAddModal}>
        Add New Category
      </Button>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {categories.map(category => (
            <tr key={category.id}>
              <th scope='row'>{category.id}</th>
              <td>{category.cat_name}</td>
              <td>
                <Button variant="primary" onClick={() => openEditModal(category.id)}>
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
          <Modal.Title>{editingCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingCategory ? (
            <div>
              <label className="category-label">Editing category:</label>
              <input
                className="category-input"
                type="text"
                value={editedCategoryName}
                onChange={handleEditInputChange}
              />
            </div>
          ) : (
            <div>
              <label className="category-label">New category:</label>
              <input
                className="category-input"
                type="text"
                value={newCategoryName}
                onChange={handleNewInputChange}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={editingCategory ? handleEditSubmit : handleNewSubmit}>
            {editingCategory ? 'Save Changes' : 'Add Category'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
