/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { fetchBlogDetailRequest } from 'src/redux/actions/blogActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingCommon from 'src/components/LoadingCommon';
import Notification from 'src/components/Notification';
import date_img from 'src/assets/images/date.svg';
import avatar_img from 'src/assets/images/avatar.svg';
import { formatDateTime } from 'src/utils/helper';

function BlogDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { blogDetail, loading, error } = useSelector((state: RootState) => state.blog) ?? {};

  useEffect(() => {
    dispatch(fetchBlogDetailRequest(id));
  }, [id]);

  if (loading) return <LoadingCommon />;
  if (error) return <Notification message={error} />;

  return (
    <div className="blog-single gray-bg">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-8 m-15px-tb">
            <article className="article">
              <div className="article-img">
                <img src={blogDetail?.image} alt="blog_image" />
              </div>
              <div className="article-title">
                <h6>
                  <a href="#/">{blogDetail?.title}</a>
                </h6>
                <h2>{blogDetail?.title}</h2>
                <div className="media">
                  <div className="img-fluid">
                    <img src={date_img} alt="date_img" width={50} height={50} />
                  </div>
                  <div className="media-body">
                    <span className="mt-2 font-weight-bold align-content-center fs-4 text-black-50">
                      {formatDateTime(blogDetail?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="article-content">
                <p className="article-content-text">
                  {blogDetail?.description || blogDetail?.content}
                </p>

                {!!blogDetail?.body && (
                  <blockquote>
                    <p
                      className="blockquote-footer"
                      dangerouslySetInnerHTML={{ __html: blogDetail?.body }}
                    />
                  </blockquote>
                )}
              </div>
              <div className="nav tag-cloud">
                <a href="#/">{blogDetail?.title}</a>
              </div>
            </article>
          </div>
          <div className="col-lg-4 m-15px-tb blog-aside">
            <div className="widget widget-author">
              <div className="widget-title">
                <h3>Author</h3>
              </div>
              <div className="widget-body">
                <div className="media align-items-center">
                  <div className="avatar">
                    <img src={avatar_img} alt="author" />
                  </div>
                  <div className="media-body">
                    <h6>
                      Hello, I'm
                      <br /> Le V. Son
                    </h6>
                  </div>
                </div>
                <p>I design and develop services for customers of this blog.</p>
              </div>
            </div>
            <div className="contact-form article-comment">
              <h4>Leave a comment</h4>
              <form id="contact-form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Your comment *"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="send">
                      <button className="px-btn theme">
                        <span>Submit</span> <i className="arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogDetailPage;
