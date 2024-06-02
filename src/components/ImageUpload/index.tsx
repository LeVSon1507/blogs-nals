/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef, useState } from 'react';
import './styles.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { handleImageUpload } from 'src/utils/helper';
import CropImage from '../CropImage';
import LoadingCommon from '../LoadingCommon';

interface Props {
  selectedImage: string;
  setSelectedImage: (value) => void;
  isOpenModalCrop: boolean;
  setIsOpenModalCrop: (value) => void;
  setLoading?: (value) => void;
  setIsCropDone?: (value) => void;
}

const ImageUpload: FC<Props> = ({
  isOpenModalCrop,
  setIsOpenModalCrop,
  selectedImage,
  setSelectedImage,
  setLoading = () => {},
  setIsCropDone,
}) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleClose = () => {
    setIsOpenModalCrop(false);
  };

  const handleLinkClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (selectedImage !== '') {
      setLoading(false);
      setIsLoading(false);
    }
  }, [selectedImage, setLoading]);

  return (
    <>
      <div className="container my-1">
        {(!isEditingImage || !selectedImage) && (
          <>
            <div className="d-flex align-items-center">
              <h6 className="mr-2 font-weight-bold" style={{ color: '#8e6e51' }}>
                Upload:
              </h6>
              <button
                onClick={handleLinkClick}
                className="cursor-pointer border-info rounded-circle border p-2"
              >
                <FaCloudUploadAlt size={24} className="text-primary " />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                handleImageUpload(e.target.files, setSelectedImage);
                setIsOpenModalCrop(true);
                setIsEditingImage(true);
                setIsLoading(true);
              }}
            />
          </>
        )}

        <div className={`modal fade ${isOpenModalCrop ? 'show d-block' : ''}`} role="dialog">
          <div className="modal-dialog ">
            <div className="modal-content">
              {isLoading ? (
                <LoadingCommon />
              ) : (
                isEditingImage && (
                  <>
                    <CropImage
                      photoURL={selectedImage}
                      setIsCropDone={setIsCropDone}
                      setIsOpenModalCrop={setIsOpenModalCrop}
                      onCancel={handleClose}
                      setLoading={setIsLoading}
                      setPhotoURL={setSelectedImage}
                    />
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
