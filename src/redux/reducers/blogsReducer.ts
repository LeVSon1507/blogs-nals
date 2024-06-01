import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
} from '../actions/blogActions';
import { Blog } from '../type';

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string;
  currentPage: number;
  limit: number;
  sortBy: string;
  order: string;
  search: string;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  currentPage: 1,
  limit: 6,
  sortBy: 'createdAt',
  order: 'asc',
  search: '',
};

const blogsReducer = (state = initialState, action: any): BlogState => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return { ...state, loading: true, ...action.payload };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };
    case FETCH_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default blogsReducer;
