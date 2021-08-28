import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNew from './components/CreateNew'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [ notifColor, setNotifColor ] = useState('black')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs( initialBlogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogObject.id = (Math.random() * 10000).toFixed(0)
    setBlogs(blogs.concat(blogObject))
    setNotifColor('green')
    setNotification(
      `'${blogObject.title}' by '${blogObject.author}' added.`
    )
    setTimeout(() => setNotification(''), 10000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifColor('red')
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }

  // Logout handler - add to button
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleLike = async (id) => {
    // await blogService.update(likedBlog.id, likedBlog)
    const likedBlog = blogs.find(b => b.id === id)
    const updatedBlog = {
      ...likedBlog,
      likes:likedBlog.likes + 1 }

    await blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b =>
          b.id !== id ?
            b : returnedBlog))
      })
  }

  const deleteBlog = id => {
    const blogToDelete = blogs.find(b => b.id === id)

    if (window.confirm(`Do you really want to delete ${blogToDelete.title} by ${blogToDelete.author}?`)) {

      blogService
        .remove(id)
        .then(() =>
          setBlogs(blogs.filter(b => b.id !== id))
        )

    }
  }

  const blogsByLikes = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} notifColor={notifColor} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <CreateNew addNew={addBlog} />
            {blogsByLikes.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                deleteBlog={deleteBlog} />
            )}
          </div>

        </div>
      }
    </div>
  )
}

export default App