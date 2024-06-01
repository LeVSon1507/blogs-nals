import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import blogsReducer from './reducers/blogsReducer';
import blogSaga from './sagas/blogSagas';
import blogReducer from './reducers/blogReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(blogSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
