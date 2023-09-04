import React from 'react';

function UserList({ users }) {
    return (
        <div className="user-list">
            <h4 className="mt-2 mb-3">Users</h4>
            {users.map((user) => (
                <div key={user.id} className={`user d-block mb-2 py-2 ${user.username === roomName ? 'active' : ''}`}>
                    <div className="d-flex align-items-center gap-2">
                        <div className="avatar d-flex align-items-center justify-content-center fw-bold text-white">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <span className="name d-block">{user.username}</span>
                            {/* Add last message logic here */}
                            <span id="last-message" className="message d-block">{/* Last message */}</span>
                        </div>
                    </div>
                </div>
            ))}
            <a className="logout" href="/logout">Logout</a>
        </div>
    );
}

export default UserList;
