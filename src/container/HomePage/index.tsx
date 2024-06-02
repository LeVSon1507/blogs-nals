import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogsRequest } from 'src/redux/actions/blogActions';
import { isEmpty } from 'lodash';
import LoadingCommon from 'src/components/LoadingCommon';
import Article from 'src/components/Article';
import Pagination from 'src/components/Pagination';
import SearchBar from 'src/components/SearchBar';
import Notification from 'src/components/Notification';
import { RootState } from 'src/redux/store';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    blogs = [],
    loading,
    error,
    currentPage,
    limit,
    sortBy,
    order,
    search,
  } = useSelector((state: RootState) => state.blogs) ?? {};

  useEffect(() => {
    dispatch(fetchBlogsRequest({ page: currentPage, limit, sortBy, order, search }));
  }, [dispatch, currentPage, limit, sortBy, order, search]);

  const paginate = (pageNumber: number) =>
    dispatch(fetchBlogsRequest({ page: pageNumber, limit, sortBy, order, search }));

  const handleSearch = (searchTerm: string) =>
    dispatch(fetchBlogsRequest({ page: 1, limit, sortBy, order, search: searchTerm }));

  const handleCreateBlog = () => navigate('/blogs/new-edit-blog');

  if (loading) return <LoadingCommon />;
  if (error) return <Notification message={error} />;

  return (
    <div className="d-flex flex-column">
      <h3 className="text-center mt-5">Tin Tức</h3>
      {!isEmpty(blogs) && !loading ? (
        <>
          <SearchBar onSearch={handleSearch} searchKey={search} />
          <div className="container d-flex justify-content-start">
            <button
              className="btn btn-primary text-center d-flex justify-content-start"
              onClick={handleCreateBlog}
            >
              <FaPlus className="mr-1" size={20} />
              Add Blog
            </button>
          </div>
          <Article data={blogs} />
        </>
      ) : (
        <Notification message="Không tìm thấy tin tức" />
      )}
      <Pagination totalPosts={blogs.length} onPageChange={paginate} currentPage={currentPage} />
    </div>
  );
};

export default HomePage;
