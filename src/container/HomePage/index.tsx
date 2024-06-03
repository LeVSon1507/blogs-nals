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
import SortDropDown from 'src/components/SortDropDown';

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
  const [totalPages, setTotalPages] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState(sortBy);
  const [orderType, setOrderType] = useState(order);

  // TODO: handle count total page for pagination because it's not have in API
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
    dispatch(
      fetchBlogsRequest({ page: currentPage, limit, sortBy: sort, order: orderType, search }),
    );
  }, [dispatch, currentPage, limit, sort, orderType, search, handleCountTotalPage]);

  const paginate = (pageNumber: number) =>
    dispatch(
      fetchBlogsRequest({ page: pageNumber, limit, sortBy: sort, order: orderType, search }),
    );

  const handleSearch = (searchTerm: string) =>
    dispatch(
      fetchBlogsRequest({ page: 1, limit, sortBy: sort, order: orderType, search: searchTerm }),
    );

  const handleCreateBlog = () => navigate('/blogs/new-edit-blog');

  const isNotFoundArticle =
    isEmpty(blogs) ||
    (error === MESSAGE_404 && !!search) ||
    (error === ERR_MESSAGE && currentPage !== 1);

  const toggleSearchBar = () => {
    setIsSearch((prev) => !prev);
  };

  const handleSort = (sortTerm: string, orderType: string) => {
    setSort(sortTerm);
    setOrderType(orderType);
    dispatch(
      fetchBlogsRequest({
        page: currentPage,
        limit,
        sortBy: sortTerm,
        order: orderType,
        search: search,
      }),
    );
  };

  if (loading) return <LoadingCommon />;

  return (
    <div className="d-flex flex-column">
      <h3 className="text-center mt-5">Tin Tức</h3>
      {!loading && (
        <>
          <div
            className={`container ${isSearch ? '' : 'd-flex flex-wrap justify-content-between'}`}
          >
            <SearchBar
              onSearch={handleSearch}
              isSearch={isSearch}
              searchKey={search}
              toggleSearchBar={toggleSearchBar}
            />
            <div className="d-flex mt-3 flex-wrap">
              <button
                className="btn btn-primary d-flex align-items-center mr-2 mb-2"
                onClick={handleCreateBlog}
              >
                <FaPlus className="mr-1" size={20} />
                <span>Add Blog</span>
              </button>
              <SortDropDown onSort={handleSort} sortKey={sort} sortOrder={orderType} />
            </div>
          </div>
          {isNotFoundArticle ? (
            <Notification message="Không tìm thấy tin tức" isHideBtn />
          ) : (
            <Article data={blogs} />
          )}
        </>
      )}
      {!loading && (
        <Pagination
          totalPosts={blogs.length}
          onPageChange={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default HomePage;
