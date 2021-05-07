const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Urf!",
    "author": "Sparky",
    "url": "https://google.com",
    "likes": 100
  },
  {
    "title": "Having a Crisis",
    "author": "Adrien",
    "url": "https://google.com",
    "likes": 777
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb
}