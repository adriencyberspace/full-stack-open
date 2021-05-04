const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

function totalLikes(blogs) {
  const likesArray = blogs.map(blog => blog.likes)
  const reducer = (sum, val) => sum + val;
  const initialValue = 0;
  return likesArray.reduce(reducer, initialValue);
}

function favoriteBlog(blogs) {
  const arr = blogs.map(blog => blog.likes)
  const max = Math.max(...arr)
  const index = arr.indexOf(max)

  const res = 
    {
      title: `${blogs[index].title}`,
      author: `${blogs[index].author}`,
      likes: blogs[index].likes
    }

  return res
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}