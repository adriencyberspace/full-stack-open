import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)

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
            dispatch(addVoteTo(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList