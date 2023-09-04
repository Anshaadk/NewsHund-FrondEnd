import React from 'react'
import { Link } from 'react-router-dom'

function User_Footer() {
  return (
    <div>


<div className="container my-5 ">


  <footer
          className="text-center text-lg-start text-white"
          style={{backgroundColor: '#1c2331'}}
          >
    
    <section
             className="d-flex justify-content-between p-4"
             style={{backgroundColor: 'black'}}
             >
      
    </section>
    
    <section className="">
      <div className="container text-center text-md-start mt-5">
       
        <div className="row mt-3">
          
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
           
            <h6 className="text-uppercase fw-bold">NewsHund</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: '60px', backgroundColor:' #7c4dff' ,height: '2px'}}
                />
            <p>
              It Test of Purchase free News Based on author and user created By Anshad
            </p>
          </div>
          
          
          

          
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            
            <h6 className="text-uppercase fw-bold">Useful links</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: '60px', backgroundColor:' #7c4dff' ,height: '2px'}}
                />
            <p>
              <Link to={'/user_profile'} className="text-white">Your Account</Link>
            </p>
            <p>
              <Link to={'/chat'} className="text-white">Chat</Link>
            </p>
            
          </div>
          
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: '60px', backgroundColor:' #7c4dff' ,height: '2px'}}
                />
            <p><i className="fas fa-home mr-3"></i> Kerala ,Malappuram ,673638</p>
            <p><i className="fas fa-envelope mr-3"></i> Anshad@gmail.com</p>
            <p><i className="fas fa-phone mr-3"></i> +91 9495924658</p>
           
          </div>
          
        </div>
        
      </div>
    </section>
    
    <div
         className="text-center p-3"
         style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
         >
      © :
      <a className="text-white" href="/"
         > NewsHund</a
        >
    </div>
   
  </footer>
 

</div>

    </div>
  )
}

export default User_Footer