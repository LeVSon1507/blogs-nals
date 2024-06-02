import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios, { all } from 'axios';
import {
  fetchBlogsSuccess,
  fetchBlogsFailure,
  FETCH_BLOGS_REQUEST,
  fetchBlogDetailSuccess,
  fetchBlogDetailFailure,
  FETCH_BLOG_DETAIL_REQUEST,
  CREATE_BLOG_REQUEST,
  createBlogSuccess,
  createBlogFailure,
  EDIT_BLOG_REQUEST,
  editBlogFailure,
  editBlogSuccess,
} from '../actions/blogActions';
import { Blog } from '../type';
import { BASE_URL } from 'src/utils/helper';

function* fetchBlogs(action: {
  type: string;
  payload: { page: number; limit: number; sortBy?: string; order?: string; search?: string };
}) {
  try {
    const { page, limit, sortBy, order = 'asc', search = '' } = action.payload;
    const response: { data: Blog[] } = yield call(axios.get, BASE_URL, {
      params: { page, limit, sortBy, order, search },
    });

    yield put(fetchBlogsSuccess(response.data));
  } catch (error) {
    yield put(fetchBlogsFailure(error.message));
  }
}

function* fetchBlogDetail(action: { type: string; payload: string }) {
  try {
    const response = yield call(axios.get, `${BASE_URL}/${action?.payload}`);
    yield put(fetchBlogDetailSuccess(response.data));
  } catch (error) {
    yield put(fetchBlogDetailFailure(error.message));
  }
}

function* createBlog(action) {
  try {
    const { data } = yield call(axios.post, BASE_URL, action.payload);
    yield put(createBlogSuccess(data));
  } catch (error) {
    yield put(createBlogFailure(error));
  }
}

function* editBlog(action) {
  try {
    const { payload } = action;
    yield call(
      axios.put,
      `https://5f55a98f39221c00167fb11a.mockapi.io/blogs/${payload.id}`,
      payload.data,
    );
    yield put(editBlogSuccess());
  } catch (error) {
    yield put(editBlogFailure(error.message));
  }
}

function* blogSaga() {
  yield all([
    yield takeEvery(FETCH_BLOGS_REQUEST, fetchBlogs),
    yield takeEvery(FETCH_BLOG_DETAIL_REQUEST, fetchBlogDetail),
    yield takeLatest(CREATE_BLOG_REQUEST, createBlog),
    yield takeLatest(EDIT_BLOG_REQUEST, editBlog),
  ]);
}

export default blogSaga;
