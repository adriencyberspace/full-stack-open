import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

// 5.16
test('<BlogForm /> correct details from input', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Gremlins R Us' }
  })
  fireEvent.change(author, {
    target: { value: 'Sparky' }
  })
  fireEvent.change(url, {
    target: { value: 'www.sparksemall.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].title).toBe('Gremlins R Us')
  expect(createBlog.mock.calls[0][0].author).toBe('Sparky')
  expect(createBlog.mock.calls[0][0].url).toBe('www.sparksemall.com')
})