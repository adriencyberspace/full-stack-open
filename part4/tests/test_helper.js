const Blog = require('../models/blog')

const existingId = async () => {
  const blogs = await Blog.find({})
  return blogs[0]._id
}


module.exports = {
  existingId
}