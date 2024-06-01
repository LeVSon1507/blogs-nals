import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchBlogsSuccess,
  fetchBlogsFailure,
  FETCH_BLOGS_REQUEST,
  fetchBlogDetailSuccess,
  fetchBlogDetailFailure,
  FETCH_BLOG_DETAIL_REQUEST,
} from '../actions/blogActions';
import { Blog } from '../type';

function* fetchBlogs(action: {
  type: string;
  payload: { page: number; limit: number; sortBy?: string; order?: string; search?: string };
}) {
  try {
    const { page, limit, sortBy, order = 'asc', search = '' } = action.payload;
    const response: { data: Blog[] } = yield call(
      axios.get,
      `https://5f55a98f39221c00167fb11a.mockapi.io/blogs`,
      {
        params: { page, limit, sortBy, order, search },
      },
    );
    console.log(response);

    yield put(fetchBlogsSuccess(response.data));
  } catch (error) {
    yield put(fetchBlogsFailure(error.message));
  }
}

function* fetchBlogDetail(action: { type: string; payload: string }) {
  try {
    const response = yield call(
      axios.get,
      `https://5f55a98f39221c00167fb11a.mockapi.io/blogs/${action?.payload}`,
    );
    yield put(fetchBlogDetailSuccess(response.data));
  } catch (error) {
    yield put(fetchBlogDetailFailure(error.message));
  }
}

function* blogSaga() {
  yield takeEvery(FETCH_BLOGS_REQUEST, fetchBlogs);
  yield takeEvery(FETCH_BLOG_DETAIL_REQUEST, fetchBlogDetail);
}

export default blogSaga;
