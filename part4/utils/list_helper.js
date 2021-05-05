// 4.3 Dummy Test
const dummy = (blogs) => {
  return 1
}

// 4.4 Total Likes
function totalLikes(blogs) {
  const likesArray = blogs.map(blog => blog.likes)
  const newest = likesArray.reduce((acc, cur) => acc + cur, 0)

  return newest;
}

// 4.5 Favorite Blog
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

// 4.6 Most Blogs
function mostBlogs(blogs) {
  const authorsArray = blogs.map(blog => blog.author)
  const countObj = 
    authorsArray.reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : acc[cur] = 1
    return acc
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

// 4.7 Most Likes
function mostLikes(blogs) {

  var arr = blogs.map(blog => ({ author: blog.author, likes: blog.likes }));

  const output = arr.reduce((acc, cur) => {
    let author = cur.author;
    let found = acc.find(elem => elem.author === author)
    if (found) found.likes += cur.likes;
    else acc.push(cur);
    return acc;
  }, []);

  const highest = output.reduce((acc, cur) => acc.likes > cur.likes ? acc : cur)

  return highest
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}