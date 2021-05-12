import React from 'react'
import Togglable from '../components/Togglable'

const Blog = ({blog}) => {
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
      <div>{blog.likes}</div> 
      <div>{blog.author}</div>
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