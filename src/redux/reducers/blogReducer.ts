import {
  FETCH_BLOG_DETAIL_REQUEST,
  FETCH_BLOG_DETAIL_SUCCESS,
  FETCH_BLOG_DETAIL_FAILURE,
} from '../actions/blogActions';
import { Blog } from '../type';

interface BlogDetailState {
  blogDetail: Blog;
  loading: boolean;
  error: string;
}

const initialState: BlogDetailState = {
  blogDetail: null,
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
    default:
      return state;
  }
};

export default blogReducer;
