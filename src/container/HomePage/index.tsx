import React, { useCallback, useEffect, useState } from 'react';
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
import { BASE_URL, ERR_MESSAGE, MESSAGE_404 } from 'src/utils/helper';
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

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

  // TODO: handle count for total page because missing totalPages in api
  const handleCountTotalPage = useCallback(async () => {
    try {
      const response = await axios.get(BASE_URL);
      const totalPosts = response?.data?.length;
      const calculatedTotalPages = Math.ceil(totalPosts / limit);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.log(error);
    }
  }, [limit]);

  useEffect(() => {
    handleCountTotalPage();
    dispatch(fetchBlogsRequest({ page: currentPage, limit, sortBy, order, search }));
  }, [dispatch, currentPage, limit, sortBy, order, search, handleCountTotalPage]);

  const paginate = (pageNumber: number) =>
    dispatch(fetchBlogsRequest({ page: pageNumber, limit, sortBy, order, search }));

  const handleSearch = (searchTerm: string) =>
    dispatch(fetchBlogsRequest({ page: 1, limit, sortBy, order, search: searchTerm }));

  const handleCreateBlog = () => navigate('/blogs/new-edit-blog');

  const isNotFoundArticle =
    isEmpty(blogs) ||
    (error === MESSAGE_404 && !!search) ||
    (error === ERR_MESSAGE && currentPage !== 1);

  if (loading) return <LoadingCommon />;

  return (
    <div className="d-flex flex-column">
      <h3 className="text-center mt-5">Tin Tức</h3>
      {!loading ? (
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
          {isNotFoundArticle ? (
            <Notification message="Không tìm thấy tin tức" isHideBtn />
          ) : (
            <Article data={blogs} />
          )}
        </>
      ) : (
        <Notification message="Không tìm thấy tin tức" />
      )}
      <Pagination
        totalPosts={blogs.length}
        onPageChange={paginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default HomePage;
