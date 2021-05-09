const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, 
  blogsInDb,
  usersInDb
}