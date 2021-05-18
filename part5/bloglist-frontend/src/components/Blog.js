import React from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  const blogStyle = {
    color: 'black' ,
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 500
  }

  const blogView = () => (
    <Togglable buttonLabel='View' buttonClose='Hide'>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={(event) => handleLike(blog.id)}>Like</button>
      </div>
      <div>{blog.author}</div>
      <button onClick={(event) => deleteBlog(blog.id)}>Remove</button>
    </Togglable>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        {blogView()}
      </div>

    </div>
  )

}

export default Blog