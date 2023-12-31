import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/Login/SignUp.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Dashboard from './components/Dashboard.jsx';
import CreatePost from './components/funtionality/CreatePost.jsx';
import ManageMyCommunity from './components/funtionality/ManageMyCommunity.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path:'/communities/:communityId',
        element: <ManageMyCommunity></ManageMyCommunity>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
