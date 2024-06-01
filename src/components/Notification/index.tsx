import React from 'react';
import not_found_image from 'src/assets/images/not_found.svg';

const Notification = ({
  message = 'Something went wrong, please try again!',
}: {
  message?: string;
}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-7">
      <img src={not_found_image} width={500} height={500} alt="not_found" />
      <p className="font-weight-bold fs-4 text-center">{message}</p>
    </div>
  );
};

export default Notification;
