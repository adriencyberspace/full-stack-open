const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blog posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog post title is by Adrien', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].author).toBe('Sparky')
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog post can be added ', async () => {
  const blogs = await api.get('/api/blogs')


  const newBlog = {
    title: 'I Pee When You Leave',
    author: "Abby",
    url: "https://www.google.com",
    likes: 666
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(blogs.body.length + 1)

  // const contents = notesAtEnd.map(n => n.content)
  // expect(contents).toContain(
  //   'async/await simplifies making async calls'
  // )
})


afterAll(() => {
  mongoose.connection.close()
})