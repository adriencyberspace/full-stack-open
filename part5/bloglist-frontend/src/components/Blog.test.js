import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let 
    component,
    author,
    title,
    url,
    likes

  beforeEach(() => {
    const blog = {
      author: 'Adrien',
      title: 'You wish my friend',
      url: 'www.google.com',
      likes: 7
    }

    const thisBlog = {}

    component = render(
      <Blog blog={blog} />
    )

    author = component.getByText('Adrien')
    title = component.getByText('You wish my friend')
    url = component.getByText('www.google.com')
    likes = component.getByText('Like')
  })

  // 5.13
  test('renders author and title, does not render likes and url', () => {
  
    expect(author).toBeVisible()
    expect(title).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  
  })

  // 5.14
  test('renders likes and url when View button is clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

})

// 5.15
test('if Like button is clicked twice, event handler is called twice', () => {
  const blog = {
    author: 'Adrien',
    title: 'You wish my friend',
    url: 'www.google.com',
    likes: 7
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})


