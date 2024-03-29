import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import Users from './components/Users'

import storage from './utils/storage'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { displayNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

// import blogService from './services/blogs'

import  { useSelector, useDispatch } from 'react-redux'



const App = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(displayNotification(`a new blog '${blog.title}' by ${blog.author} added!`))
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>Login to application</h2>

        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  const navStyle = {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgray'
  }

  return (
    <Router>
      <div style={navStyle}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      </div>

      <h2>Blogs</h2>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>

    </Router>
  )
}

export default App