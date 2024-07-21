/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import img from 'src/assets/images/dev_activity.svg';

function Navbar() {
  const navigate = useNavigate();

  const handleGoToOtherPage = (target: string) => {
    navigate('/' + target);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark align-content-center fixed-top">
      <div className="container d-flex align-content-center">
        <button
          onClick={() => handleGoToOtherPage('')}
          className="pointer-event bg-transparent border-0 mt-2 text-light justify-content-center d-flex align-content-center"
        >
          <img src={img} alt="LOGO" width={25} height={25} />
          <p className="ml-2 font-weight-bold lead">Dev Guide</p>
        </button>
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
                className="nav-link text-light align-content-center cursor-pointer"
                onClick={() => handleGoToOtherPage('')}
              >
                Home
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
