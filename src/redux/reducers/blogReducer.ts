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
  isEditSuccess: boolean;
  isCreateSuccess: boolean;
  newBlogInfo: Blog;
}

const initialState: BlogDetailState = {
  blogDetail: null,
  isEditSuccess: false,
  isCreateSuccess: false,
  newBlogInfo: null,
  loading: false,
  error: null,
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
      return initialState;
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
        isCreateSuccess: true,
        newBlogInfo: action.payload,
      };
    case CREATE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        isCreateSuccess: false,
        error: action.payload,
      };
    case EDIT_BLOG_REQUEST:
      return {
        ...state,
        isEditSuccess: false,
        loading: true,
        error: null,
      };
    case EDIT_BLOG_SUCCESS:
      return {
        ...state,
        isEditSuccess: true,
        loading: false,
      };
    case EDIT_BLOG_FAILURE:
      return {
        ...state,
        isEditSuccess: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
