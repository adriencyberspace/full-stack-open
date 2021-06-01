import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} votes 
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    const filter = state.filter
    const anecdotes = state.anecdotes
    if ( filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(`${filter}`))
  })

  const vote = (anecdote) => {
    dispatch(addVoteTo(anecdote))
    dispatch(displayNotification(`You voted "${anecdote.content}"`, 5))
  }

  const anecdotesByVotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  return(
    <ul>
      {anecdotesByVotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            vote(anecdote)
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList