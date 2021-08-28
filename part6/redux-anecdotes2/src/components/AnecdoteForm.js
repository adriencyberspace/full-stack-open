import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const NewAnecdote = (props) => {
const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
  }
}

export default connect(
  null, 
  mapDispatchToProps
)(NewAnecdote)