import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGLIST':
    return action.data
    // case 'VOTE':
    //   const id = action.data
    //   const anecdoteToChange = state.find(a => a.id === id)
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1
    //   }
    //   return state.map(anecdote =>
    //     anecdote.id !== id ? anecdote : changedAnecdote
    //   )
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGLIST',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch({
      type: 'NEW_Blog',
      data: newBlog
    })
  }
}

export default blogReducer