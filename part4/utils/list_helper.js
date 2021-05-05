const dummy = (blogs) => {
  return 1
}

function totalLikes(blogs) {
  const likesArray = blogs.map(blog => blog.likes)
  const reducer = (sum, val) => sum + val;
  return likesArray.reduce(reducer, 0);
}

function favoriteBlog(blogs) {
  const arr = blogs.map(blog => blog.likes)
  const max = Math.max(...arr)
  const index = arr.indexOf(max)

  return {
      title: blogs[index].title,
      author: blogs[index].author,
      likes: blogs[index].likes
    }
}


function mostBlogs(blogs) {
  const authorsArray = blogs.map(blog => blog.author)
  const countObj = 
    authorsArray.reduce((sum, current) => {
    sum[current] ? sum[current]++ : sum[current] = 1
    return sum
  }, {})

  let authorMost, max = 0

  for(const [key, value] of Object.entries(countObj)) {
    if(value > max) {
      max = value
      authorMost = key
    }
  }

  return {
    author: authorMost,
    blogs: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}