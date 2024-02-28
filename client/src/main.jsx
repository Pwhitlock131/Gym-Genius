import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
//import Login from './pages/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Header from './pages/Header.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Profile from './pages/Profile.jsx'
 // import Signup from './pages/Signup.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './pages/Signup.jsx'
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {path:"/profile",
        element: <Profile />
      },
      {path:"/signup",
        element: <Signup />
      },
      {path:"/login",
        element: <Login />
      },
      {path:"/logout",
        element: <Logout />
      },
      {path:"/errorPage",
        element: <ErrorPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
