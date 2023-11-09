import App from './App.jsx'
import Home from "./pages/Home/index.jsx"
import AllPosts from './pages/Blog/AllPosts.jsx'
import Post from './pages/Blog/Post.jsx'
import AllTopics from './pages/Topic/AllTopics.jsx'
import Topic from './pages/Topic/Topic.jsx'
import Register from './pages/User/Register.jsx'
import Login from './pages/User/Login.jsx'
import { createBrowserRouter } from "react-router-dom"
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
        {
            index: true, 
            element: <Home />
        },
        {
            path: "/posts", 
            element: <AllPosts />
        },
        {
            path: "/posts/:id", 
            element: <Post /> 
        },
        {
            path: "/topics", 
            element: <AllTopics />
        },
        {
            path: "/topics/:id", 
            element: <Topic /> 
        }
      ]
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  }

])

export default router