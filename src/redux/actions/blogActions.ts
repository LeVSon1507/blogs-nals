import { Blog } from '../type';

export const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

export const FETCH_BLOG_DETAIL_REQUEST = 'FETCH_BLOG_DETAIL_REQUEST';
export const FETCH_BLOG_DETAIL_SUCCESS = 'FETCH_BLOG_DETAIL_SUCCESS';
export const FETCH_BLOG_DETAIL_FAILURE = 'FETCH_BLOG_DETAIL_FAILURE';

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

export const fetchBlogsSuccess = (blogs: Blog[]) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs,
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
