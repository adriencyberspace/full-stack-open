const counterReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        vote: state.vote + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default: return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: generateId()
    }
  }
}

export const addVoteTo = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default counterReducer