const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

// const totalLikes = (blogs) => {
//   const likesArray = blogs.map(blog => blog.likes)
//   return b
// }

function totalLikes(blogs) {
  const likesArray = blogs.map(blog => blog.likes)
  const reducer = (sum, val) => sum + val;
  const initialValue = 0;
  return likesArray.reduce(reducer, initialValue);
}

module.exports = {
  dummy,
  totalLikes
}