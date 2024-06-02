import {
  FETCH_BLOG_DETAIL_REQUEST,
  FETCH_BLOG_DETAIL_SUCCESS,
  FETCH_BLOG_DETAIL_FAILURE,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAILURE,
  CLEAR_BLOG_DETAIL,
  EDIT_BLOG_FAILURE,
  EDIT_BLOG_SUCCESS,
  EDIT_BLOG_REQUEST,
} from '../actions/blogActions';
import { Blog } from '../type';

interface BlogDetailState {
  blogDetail: Blog;
  loading: boolean;
  error: string;
  isEditSuccess: false;
  isCreatedBlog: boolean;
}

const initialState: BlogDetailState = {
  blogDetail: null,
  isEditSuccess: false,
  loading: false,
  error: null,
  isCreatedBlog: null,
};

const blogReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case FETCH_BLOG_DETAIL_REQUEST:
      return { ...state, loading: true };
    case FETCH_BLOG_DETAIL_SUCCESS:
      return { ...state, loading: false, blogDetail: action.payload as Blog };
    case FETCH_BLOG_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_BLOG_DETAIL:
      return {
        ...state,
        blogDetail: null,
      };
    case CREATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdBlog: action.payload,
      };
    case CREATE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_BLOG_REQUEST:
      return {
        ...state,
        isEditSuccess: true,
        error: null,
      };
    case EDIT_BLOG_SUCCESS:
      return {
        ...state,
        isEditSuccess: false,
      };
    case EDIT_BLOG_FAILURE:
      return {
        ...state,
        isEditSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
