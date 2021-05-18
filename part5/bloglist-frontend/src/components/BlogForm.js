import React, { useState } from 'react'

import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({ title: '', author: '', url:'' })

  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <label>Title:
          <input
            name="title"
            onChange={handleBlogChange}
          /></label>
        <br />
        <label> Author:
          <input
            name="author"
            onChange={handleBlogChange}
          /></label>
        <br />
        <label> URL:
          <input
            name="url"
            onChange={handleBlogChange}
          /></label>
        <br />
        <button type="submit">save</button>
      </form>
    </div>

  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm