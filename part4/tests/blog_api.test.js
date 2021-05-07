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

  expect(response.body[0].author).toBe('Adrien')
})

// test('unique identifier is named id', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response && response.every(blog => blog && blog.id)).toBeDefined()
// })


afterAll(() => {
  mongoose.connection.close()
})