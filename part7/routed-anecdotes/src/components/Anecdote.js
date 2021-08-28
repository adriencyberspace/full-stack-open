import React from 'react'
import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((anecdote) => anecdote.id === id)

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>Has {anecdote.votes} votes</div>
      <div>For more info visit {anecdote.info}</div>
    </div>
  )
}

export default Anecdote