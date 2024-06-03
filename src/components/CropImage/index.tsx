import { FaTimes, FaCrop } from 'react-icons/fa';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './helpers';

const CropImage = ({
  photoURL,
  setIsCropDone,
  onCancel,
  setIsOpenModalCrop,
  setPhotoURL,
  setLoading,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setLoading(true);
    try {
      const { url }: any = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation,
        { horizontal: false, vertical: false },
        setPhotoURL,
      );
      setPhotoURL(url);
      setIsOpenModalCrop(false);
      setIsCropDone(true);
    } catch (error) {
      console.log(error);
      setIsCropDone(false);
    }

    setLoading(false);
  };

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <div className="my-4">
      <div
        className="bg-dark position-relative"
        style={{ width: 'auto', height: '50vh', minWidth: 'auto' }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </div>
      <div className="d-flex flex-column mx-3 my-2">
        <div className="w-100 mb-3">
          <div className="mb-2">
            <label>Zoom: {zoomPercent(zoom)}</label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Rotation: {rotation + '°'}</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              onCancel?.();
              setIsCropDone(true);
            }}
          >
            <FaTimes className="me-2" /> Skip
          </button>
          <button className="btn btn-primary ml-2" onClick={cropImage}>
            <FaCrop className="me-2" /> Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImage;
