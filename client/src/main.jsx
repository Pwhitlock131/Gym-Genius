import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import Home from  './pages/Home.jsx';
//import Login from './pages/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage />, 
        children: [
            {
                index: true,
                element: <Home />,
            }
        ]
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)