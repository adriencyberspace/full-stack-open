import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs).sort((b1, b2) => b2.likes - b1.likes)

  const blogStyle = {
    color: 'black' ,
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 500
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.user.name}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Blogs
