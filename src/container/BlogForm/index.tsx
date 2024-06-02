import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ImageUpload from 'src/components/ImageUpload';
import LoadingCommon from 'src/components/LoadingCommon';
import { RootState } from 'src/redux/store';
import {
  clearBlogDetailRequest,
  createBlogRequest,
  editBlogRequest,
  fetchBlogDetailRequest,
} from 'src/redux/actions/blogActions';
import imageDefault from 'src/assets/images/default_image.svg';
import './styles.css';
import { ToastSuccess } from 'src/utils/toastOptions';
import { isEmpty } from 'lodash';

interface BlogFormData {
  title: string;
  image: string;
  content: string;
}

const yupSchema = Yup.object({
  title: Yup.string().required('Title is required'),
});

const BlogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // @ts-ignore
  const { id } = Object.fromEntries([...searchParams]);
  const isEditing = !!id;

  const { blogDetail, loading, isEditSuccess, isCreateSuccess, newBlogInfo } = useSelector(
    (state: RootState) => state.blog,
  );

  const initValue = useMemo(
    () => ({
      title: blogDetail?.title || '',
      image: blogDetail?.image || '',
      content: blogDetail?.content || '',
    }),
    [blogDetail],
  );

  const {
    register,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: initValue,
    resolver: yupResolver<any>(yupSchema),
  });

  const [imageUrl, setImageUrl] = React.useState(blogDetail?.image);
  const [isOpenModalCrop, setIsOpenModalCrop] = React.useState(false);
  const [isCropDone, setIsCropDone] = React.useState(!!blogDetail?.image);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogDetailRequest(id));
    }
    return () => {
      dispatch(clearBlogDetailRequest());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isEditing && blogDetail?.image) {
      setImageUrl(blogDetail.image);
      setIsCropDone(true);
    }
    if (!isEditing) {
      setImageUrl(imageDefault);
      setIsCropDone(false);
    }
  }, [blogDetail?.image, isEditing]);

  useEffect(() => {
    reset(initValue);
  }, [initValue, reset]);

  const submitForm = () => {
    const payload = { ...getValues(), image: imageUrl };

    if (isEditing) {
      dispatch(editBlogRequest(id, payload));
      if (isEditSuccess) {
        dispatch(fetchBlogDetailRequest(id));
        setTimeout(() => {
          ToastSuccess('Edit blog successfully');
          handleResetForm();
          navigate(`/blogs/${id}`);
        }, 1000);
      }
    } else {
      dispatch(createBlogRequest(payload));
      if (isCreateSuccess) {
        dispatch(fetchBlogDetailRequest(id));
        setTimeout(() => {
          ToastSuccess('Create new blog successfully');
          handleResetForm();
          navigate(`/blogs/${newBlogInfo?.id}`);
        }, 1000);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleResetForm = () => {
    reset({ title: '', image: '', content: '' });
    dispatch(clearBlogDetailRequest());
    setImageUrl('');
    setIsCropDone(false);
  };

  if (loading) return <LoadingCommon />;

  return (
    <div id="create-edit-form" className="p-3">
      <div className="container-fluid mt-3">
        <div className="container">
          <div className="d-flex align-items-center pt-2">
            <button onClick={handleGoBack} className="btn btn-primary">
              <IoArrowBackCircleSharp size={24} className="mr-2" />
              Back
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
            <h3 className="mb-3 mb-lg-0">{isEditing ? 'Edit' : 'Create new'} blog</h3>
            <div>
              <button
                onClick={handleResetForm}
                className="p-2 mr-2 btn btn-light btn-sm btn-icon-text"
              >
                <span className="text">Cancel</span>
              </button>
              <button
                disabled={isEmpty(imageUrl) || isEmpty(watch('content')) || isEmpty(watch('title'))}
                onClick={submitForm}
                className="p-2 btn btn-primary btn-sm btn-icon-text"
              >
                <span className="text">{isEditing ? 'Edit' : 'Create'}</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className={`col-lg-${isCropDone ? '12' : '8'}`}>
              <div className="card mb-4 card-image">
                <div className="card-body">
                  <h3 className="h6">Image:</h3>
                  <img
                    src={isCropDone && imageUrl ? imageUrl : imageDefault}
                    alt="image_blog"
                    width="100%"
                    height="100%"
                  />
                  {watch('image') && <div className="invalid-feedback">{'Image is required'}</div>}
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6 mb-4">Information</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          placeholder="Title"
                          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                          {...register('title', { required: true })}
                        />
                        {errors.title && (
                          <div className="invalid-feedback">{errors.title.message}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label htmlFor="content">Content</label>
                        <ReactQuill
                          theme="snow"
                          onChange={(value) => setValue('content', value)}
                          value={watch('content') || ''}
                        />
                        {!watch('content') && (
                          <div className="invalid-feedback">{'Content is required'}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isCropDone && (
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <h3 className="h6 mb-3">Upload Image:</h3>
                        <ImageUpload
                          selectedImage={imageUrl}
                          setSelectedImage={setImageUrl}
                          setIsCropDone={setIsCropDone}
                          isOpenModalCrop={isOpenModalCrop}
                          setIsOpenModalCrop={setIsOpenModalCrop}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
