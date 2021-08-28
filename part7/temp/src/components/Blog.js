import React from 'react'
import Togglable from './Togglable'

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
    <Togglable id="togglableBlogView" buttonLabel='View' buttonClose='Hide'>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button className="like" onClick={() => handleLike(blog.id)}>Like</button>
      </div>
      <button onClick={() => deleteBlog(blog.id)}>Remove</button>
    </Togglable>
  )

  return (
    <div style={blogStyle}>
      <div className='blog'>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        {blogView()}
      </div>

    </div>
  )

}

export default Blog