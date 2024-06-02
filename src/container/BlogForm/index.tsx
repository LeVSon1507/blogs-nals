/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import './styles.css';
import {
  clearBlogDetailRequest,
  createBlogRequest,
  editBlogRequest,
  fetchBlogDetailRequest,
} from 'src/redux/actions/blogActions';
import { yupResolver } from '@hookform/resolvers/yup';
import ImageUpload from 'src/components/ImageUpload';
import imageDefault from 'src/assets/images/default_image.svg';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingCommon from 'src/components/LoadingCommon';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { isEmpty } from 'lodash';
import ReactQuill from 'react-quill';

interface BlogFormData {
  title: string;
  image: string;
  content: string;
}

const yupSchema = Yup.object({
  title: Yup.string().required(),
  image: Yup.string().required(),
  content: Yup.string().required(),
});

function BlogFrom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  // @ts-ignore
  const currentSearchParams = Object.fromEntries([...searchParams]);

  const { id } = currentSearchParams || {};
  const isEditing = !isEmpty(id);

  const { blogDetail, loading } = useSelector((state: RootState) => state.blog) ?? {};

  const initValue = useMemo(() => {
    return {
      title: blogDetail?.title || '',
      image: blogDetail?.image || '',
      content: blogDetail?.content || '',
    };
  }, [blogDetail?.content, blogDetail?.image, blogDetail?.title]);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogDetailRequest(id));
    }
    return () => {
      dispatch(clearBlogDetailRequest());
    };
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: initValue,
    resolver: yupResolver<any>(yupSchema),
  });

  const [imageUrl, setImageUrl] = React.useState<string>(blogDetail?.image);
  const [isOpenModalCrop, setIsOpenModalCrop] = React.useState(false);
  const [isCropDone, setIsCropDone] = React.useState(!isEmpty(blogDetail?.image));

  const submitForm = async (data) => {
    const payload = {
      ...data,
      image: imageUrl,
    };

    try {
      if (isEditing) {
        dispatch(editBlogRequest(id, payload));
        dispatch(fetchBlogDetailRequest(id));

        window.location.href = `/blog/${id}`;
      } else {
        dispatch(createBlogRequest(payload));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (blogDetail?.image) {
      setImageUrl(blogDetail.image);
      setIsCropDone(true);
    }
  }, [blogDetail?.image]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleResetForm = () => {
    reset({
      title: '',
      image: '',
      content: '',
    });
    setImageUrl('');
    setIsCropDone(false);
  };

  if (loading) return <LoadingCommon />;

  return (
    <form onSubmit={handleSubmit(submitForm)} className="p-3">
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
              <button type="submit" className="p-2 btn btn-primary btn-sm btn-icon-text">
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
                    width={'100%'}
                    height={'100%'}
                  />
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6 mb-4">Information</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="title">Title *</label>
                        <input
                          type="text"
                          placeholder="Title"
                          className="form-control"
                          {...register('title', { required: true })}
                        />
                        {!!errors.title && <p className="text-danger my-2">Title is required</p>}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label htmlFor="content">Content *</label>
                        <ReactQuill
                          theme="snow"
                          value={watch('content') || ''}
                          onChange={(value) => setValue('content', value)}
                        />
                        {/* <textarea
                          className="form-control"
                          rows={5}
                          placeholder="Content"
                          {...register('content', { required: true })}
                        /> */}
                        {!!errors.content && (
                          <p className="text-danger my-2">Content is required</p>
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
    </form>
  );
}
export default BlogFrom;
