const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default: return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: content,
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const addVoteTo = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer