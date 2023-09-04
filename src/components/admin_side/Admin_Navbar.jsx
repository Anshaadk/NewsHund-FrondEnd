import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css'; // Import your custom CSS

export default function Admin_Navbar() {
  const [showNavText, setShowNavText] = useState(true);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setTimeout(() => {
      navigate('/admin_login');
    }, 1);
  };

  return (
    <>
    <MDBNavbar expand='lg' className='custom-navbar' light bgColor='primary'>
     &nbsp;&nbsp;<h1>NewsHund</h1>
    </MDBNavbar>
    <MDBNavbar expand='lg' className='custom-navbar' light bgColor='primary'>
      
      <MDBContainer fluid>
        <Link to={'/admin_dashboard'}>
          <MDBNavbarBrand className='navbar-brand'>Dashboard</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavText(!showNavText)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        
        <MDBCollapse navbar show={showNavText}>
          <MDBNavbarNav className='navbar-nav mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <Link to={'/admin_userlisting'}>
                <MDBNavbarLink className='nav-link' active aria-current='page' href='#'>
                  UserList
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <Link to={'/admin_category'}> 
              <MDBNavbarItem>
                <MDBNavbarLink className='nav-link' href='#'>Category</MDBNavbarLink>
              </MDBNavbarItem>
            </Link> 

            <Link to={'/admin_subcategory'}>
              <MDBNavbarItem>
                <MDBNavbarLink className='nav-link' href='#'>Subcategory</MDBNavbarLink>
              </MDBNavbarItem>
            </Link> 
          </MDBNavbarNav>
          <span className='navbar-text'>
            <Link className='nav-link' onClick={handleLogout}>Logout</Link>
          </span>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}
