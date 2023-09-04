import React from 'react'
import User_Navbar from '../user_side/navbar/User_NavBar'

function ChatDisgn() {
  return (
    <div>
        <User_Navbar/>
        <section style={{ backgroundColor: "#eee" }}>
  <div className="container py-5">
    <div className="row">
      <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
        <h5 className="font-weight-bold mb-3 text-center text-lg-start">Member</h5>
        <div className="card">
          <div className="card-body">
            <ul className="list-unstyled mb-0">
              <li className="p-2 border-bottom" style={{ backgroundColor: "#eee" }}>
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="60"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">John Doe</p>
                      <p className="small text-muted">Hello, Are you there?</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">Just now</p>
                    <span className="badge bg-danger float-end">1</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-7 col-xl-8">
        <ul className="list-unstyled">
          <li className="d-flex justify-content-between mb-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
            <div className="card">
              <div className="card-header d-flex justify-content-between p-3">
                <p className="fw-bold mb-0">Brad Pitt</p>
                <p className="text-muted small mb-0">
                  <i className="far fa-clock"></i> 12 mins ago
                </p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </li>
          
          <li className="bg-white mb-3">
            <div className="form-outline">
              <textarea className="form-control" id="textAreaExample2" rows="4"></textarea>
              <label className="form-label" htmlFor="textAreaExample2">
                Message
              </label>
            </div>
          </li>
          <button type="button" className="btn btn-info btn-rounded float-end">
            Send
          </button>
        </ul>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default ChatDisgn