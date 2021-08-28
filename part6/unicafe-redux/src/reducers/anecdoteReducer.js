const initialState = [{
  content: "This is an anecdote test",
  votes: 68,
  id: 38234
}, {
  content: "This is another anecdote test",
  votes: 77,
  id: 38288
}, {
  content: "Third test",
  votes: 82,
  id: 38222
}]

const anecdoteReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
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

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: content,
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

export default anecdoteReducer