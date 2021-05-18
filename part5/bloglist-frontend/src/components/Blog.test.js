import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders author and title, does not render likes and url', () => {
  const blog = {
    author: 'Adrien',
    title: 'You wish my friend',
    url: 'www.google.com',
    likes: 7
  }

  const component = render(
    <Blog blog={blog} />
  )

  const author = component.getByText('Adrien')
  const title = component.getByText('You wish my friend')
  const url = component.getByText('www.google.com')
  const likes = component.getByText('Like')

  expect(author).toBeVisible()
  expect(title).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()

})