import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [ notifColor, setNotifColor ] = useState('black')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotifColor('green')
        setNotification(
          `'${blogObject.title}' by '${blogObject.author}'  added.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
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

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' buttonClose='Cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
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
            {blogForm()}
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