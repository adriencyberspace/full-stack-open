import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const own = user && user.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      history.push('/')
    }
  }

  // const blogStyle = {
  //   color: 'black' ,
  //   fontSize: 16,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  //   width: 500
  // }

  // const blogView = () => (
  //   <Togglable id="togglableBlogView" buttonLabel='View' buttonClose='Hide'>
  //     <div>{blog.url}</div>
  //     <div>
  //       {blog.likes}
  //       <button className="like" onClick={() => handleLike(blog.id)}>Like</button>
  //     </div>
  //     <button onClick={() => deleteBlog(blog.id)}>Remove</button>
  //   </Togglable>
  // )

  return (
    <div className='blog'>
      <h3>{blog.title} by {blog.author}</h3>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        {own&&<button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )

}

export default Blog