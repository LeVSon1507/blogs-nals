import React from 'react';
import not_found_image from 'src/assets/images/not_found.svg';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Notification = ({
  message = 'Something went wrong, please try again!',
}: {
  message?: string;
}) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
    window.location.reload();
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-7 mb-4">
      <img src={not_found_image} width={500} height={500} alt="not_found" />
      <p className="font-weight-bold fs-4 text-center">{message}</p>
      <button onClick={handleBackToHome} className="btn btn-primary d-flex center">
        <FaHome className="mt-1 mr-2" />
        Back to home
      </button>
      <button onClick={handleContactUs} className="btn btn-warning mt-2">
        Contact Us
      </button>
    </div>
  );
};

export default Notification;
