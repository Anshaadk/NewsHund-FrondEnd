import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Singlepage from './pages/Singlepage';
import User_login from './components/Login/Login/User_login';
import User_registration from './components/Login/Registor/User_registration';
import Staff_login from './components/Login/Login/Staff_login';
import Staff_registration from './components/Login/Registor/Staff_registration';
import Staff_payment from './components/staff_side/Staff_payment';
import Staff_Dashboard from './pages/Staff_Dashboard';
import Modaltest from './components/Login/Modaltest';
import User_profile from './components/user_side/User_profile';
import Staff_uploads from './components/staff_side/Staff_uploads';
import Staff_newsadding from './components/staff_side/Staff_newsadding';
import Payment_success from './components/staff_side/Payment_success';
import 'react-toastify/dist/ReactToastify.css';
import Staff_upload_trend from './components/staff_side/Staff_upload_trend';
import Staff_trendnewsadding from './components/staff_side/Staff_trendnewsadding';
import Staff_trendnewsedit from './components/staff_side/Staff_trendnewsedit';
import Staff_Profile from './components/staff_side/Staff_Profile';
import Staff_profileupdate from './components/staff_side/Staff_profileupdate';
import Staff_passchange from './components/staff_side/Staff_passchange';
import User_profileupdate from './components/user_side/User_profileupdate';
import User_passchange from './components/user_side/User_passchange';
import Staff_wallet from './components/staff_side/Staff_wallet';
import Staff_editNews from './components/staff_side/Staff_editnews';
import User_wallet from './components/user_side/User_wallet';
import ChatApp from './components/Chat/Chat';
import Notification from './components/user_side/Notification';
import ChatDisgn from './components/Chat/ChatDisgn';
import Following_List from './components/user_side/Following_List';
import User_chat from './components/user_side/User_chat';
import Mychart from './components/staff_side/Staff_Dashboard/Mychart';
import Staff_Followers from './components/staff_side/Staff_Followers';
import Admin_login from './components/admin_side/Admin_login';
import Admin_Dashboard from './components/admin_side/Admin_Dashboard';
import Admin_Category from './components/admin_side/Admin_Category';
import Admin_Subcategory from './components/admin_side/Admin_subcategory';
import Admin_UserListing from './components/admin_side/Admin_userlisting';
import NotAuthorizedPage from './components/Not_autherized';







function App() {
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  const { phone, name, email, username,is_staff } = user || { name: '', email: '', username: '', phone: '' };
  const [currentUser, setCurrentUser] = useState({ id: userId, username: username });
  console.log(user,'sa');
  // console.log(user.is_admin)


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/singlepage/:id" element={<Singlepage />} />
        <Route path="/user_login" element={<User_login />} />
        <Route path="/staff_login" element={<Staff_login />} />
        <Route path="/user_registration" element={<User_registration />} />
        
          
        <Route path="/staff_registration" element={<Staff_registration />} />
        
        <Route path="/staff_Payment" element={<Staff_payment/>}/>

        
        <Route path="/staff_dashboard" element={<Staff_Dashboard/>}/>
       
       
        <Route path="/modaltest" element={<Modaltest/>}/>
        <Route path="/user_profile" element={<User_profile/>}/>
        <Route path="/staff_upload" element={<Staff_uploads/>}/>
        <Route path="/staff_adding" element={<Staff_newsadding/>}/>
        <Route path="/staff_newsedit/:id" element={<Staff_editNews/>}/>

        <Route path="/payment_success/:paymentId/:amount/:formattedDate" element={<Payment_success />} />
        <Route path='/staff_upload_trend' element={<Staff_upload_trend/>}/>
        <Route path='/staff_trendnewsadding' element={<Staff_trendnewsadding/>}/>

        <Route path="/staff_trend_edit/:id" element={<Staff_trendnewsedit />} />

        <Route path='/staff_profile' element={<Staff_Profile/>}/>
        <Route path='/staff_profileupdate/:profileId' element={<Staff_profileupdate/>}/>
        <Route path='/staff_passwordchange/:UserId'element={<Staff_passchange/>}/>
        <Route path='/user_profileupdate/:profileId' element={<User_profileupdate/>}/>
        <Route path='/user_passwordchange/:UserId'element={<User_passchange/>}/>
        <Route path='/staff_wallet'element={<Staff_wallet/>}/>
        <Route path='/user_wallet'element={<User_wallet/>}/>

        <Route path="/chat" element={<User_chat />} />
        <Route path="/staff_chat" element={<Mychart />} />


        <Route path="/notification" element={<Notification />} />


        <Route path="/chat_test" element={<ChatDisgn/>} />
        <Route path='/following' element={<Following_List/>}/>
        <Route path='/staff_followed' element={<Staff_Followers/>}/>


        <Route path='/admin_login' element={<Admin_login/>}/>
        {user?.is_admin && (
          
            <>
              <Route path='/admin_dashboard' element={<Admin_Dashboard />} />
              <Route path='/admin_category' element={<Admin_Category />} />   
              <Route path='/admin_subcategory' element={<Admin_Subcategory />} />
              <Route path='/admin_userlisting' element={<Admin_UserListing />} />
            </>
          )}

    <Route path="/not_authorized" element={<NotAuthorizedPage />} />
        






        
        


        



        




        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
