import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './container/HomePage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ManageLayout from './components/ManageLayout';
import BlogDetailPage from './container/BlogDetailPage';
import Notification from './components/Notification';
import ContactUs from './components/ContactUs';
import LazyShow from './components/Animated/LazyShow';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ManageLayout />,
      children: [
        {
          path: '/',
          element: (
            <LazyShow>
              <HomePage />
            </LazyShow>
          ),
        },
        {
          path: '/blogs/:id',
          element: <BlogDetailPage />,
        },
        {
          path: '/contact',
          element: (
            <LazyShow>
              <ContactUs />
            </LazyShow>
          ),
        },
      ],
    },

    {
      path: '*',
      element: <Notification message="Không tìm thấy trang" />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
