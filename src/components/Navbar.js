import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
  const [cartview, setCartview] = useState(false);
  let data = useCart()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1 fst-italic" to="#">
            GoFooD
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <NavLink className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {localStorage.getItem('authToken') ? (
                <li className="nav-item">
                  <NavLink className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </NavLink>
                </li>
              ) : (
                ''
              )}
            </ul>
            {!localStorage.getItem('authToken') ? (
              <div className="d-flex">
                <NavLink className="btn bg-white text-success mx-1" to="/login">
                  Login
                </NavLink>
                <NavLink className="btn bg-white text-success mx-1" to="/createuser">
                  Signup
                </NavLink>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={() => { setCartview(true) }}>
                  MyCart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartview ? <Modal onClose={() => setCartview(false)}><Cart /></Modal> : null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
