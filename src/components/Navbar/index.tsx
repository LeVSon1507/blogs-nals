/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleGoToOtherPage = (target: string) => {
    navigate('/' + target);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark align-content-center fixed-top">
      <div className="container d-flex align-content-center">
        <div className="mt-2 text-light justify-content-center d-flex align-content-center">
          <img
            src="https://nals.vn/wp-content/uploads/2021/03/nals-white.png"
            alt="LOGO_NALS"
            width={25}
            height={25}
          />
          <p className="ml-2 font-weight-bold lead">LVS Blogs</p>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mt-1">
            <li className="nav-item">
              <p
                className="nav-link text-light cursor-pointer"
                onClick={() => handleGoToOtherPage('')}
              >
                Home
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link text-light cursor-pointer"
                onClick={() => handleGoToOtherPage('about')}
              >
                About
              </p>
            </li>

            <li className="nav-item">
              <p
                className="nav-link text-light cursor-pointer"
                onClick={() => handleGoToOtherPage('contact')}
              >
                Contact
              </p>
            </li>

            <li className="nav-item">
              <p
                className="nav-link text-light cursor-pointer"
                onClick={() => handleGoToOtherPage('login')}
              >
                Login
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;