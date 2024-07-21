import { Blog } from '../type';

export const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

export const FETCH_BLOG_DETAIL_REQUEST = 'FETCH_BLOG_DETAIL_REQUEST';
export const FETCH_BLOG_DETAIL_SUCCESS = 'FETCH_BLOG_DETAIL_SUCCESS';
export const FETCH_BLOG_DETAIL_FAILURE = 'FETCH_BLOG_DETAIL_FAILURE';
export const CLEAR_BLOG_DETAIL = 'CLEAR_BLOG_DETAIL';

export const CREATE_BLOG_REQUEST = 'CREATE_BLOG_REQUEST';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAILURE = 'CREATE_BLOG_FAILURE';

export const EDIT_BLOG_REQUEST = 'EDIT_BLOG_REQUEST';
export const EDIT_BLOG_SUCCESS = 'EDIT_BLOG_SUCCESS';
export const EDIT_BLOG_FAILURE = 'EDIT_BLOG_FAILURE';

export const editBlogRequest = (id: string, data) => ({
  type: 'EDIT_BLOG_REQUEST',
  payload: { id, data },
});

export const editBlogSuccess = () => ({
  type: 'EDIT_BLOG_SUCCESS',
});

export const editBlogFailure = (error) => ({
  type: 'EDIT_BLOG_FAILURE',
  payload: error,
});

export const fetchBlogsRequest = (params: {
  page: number;
  limit: number;
  sortBy?: string;
  order?: string;
  search?: string;
}) => ({
  type: FETCH_BLOGS_REQUEST,
  payload: params,
});

export const fetchBlogsSuccess = ({
  blogs,
  totalPages,
}: {
  blogs: Blog[];
  totalPages: number;
}) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: {
    blogs,
    totalPages,
  },
});

export const fetchBlogsFailure = (error: string) => ({
  type: FETCH_BLOGS_FAILURE,
  payload: error,
});

export const fetchBlogDetailRequest = (id: string) => ({
  type: FETCH_BLOG_DETAIL_REQUEST,
  payload: id,
});

export const fetchBlogDetailSuccess = (blog: Blog) => ({
  type: FETCH_BLOG_DETAIL_SUCCESS,
  payload: blog,
});

export const fetchBlogDetailFailure = (error: string) => ({
  type: FETCH_BLOG_DETAIL_FAILURE,
  payload: error,
});

export const clearBlogDetailRequest = () => ({
  type: CLEAR_BLOG_DETAIL,
});

export const createBlogRequest = (blogData) => ({
  type: CREATE_BLOG_REQUEST,
  payload: blogData,
});

export const createBlogSuccess = (blog) => ({
  type: CREATE_BLOG_SUCCESS,
  payload: blog,
});

export const createBlogFailure = (error) => ({
  type: CREATE_BLOG_FAILURE,
  payload: error,
});
