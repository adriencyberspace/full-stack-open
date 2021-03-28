import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, Array(anecdotes.length)).map(Number.prototype.valueOf,0));
  const [mostVotes, setMostVotes] = useState(0)


  const randomNumber = () => {
    const number = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(number)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    calculateWinner()
  }

  const calculateWinner = () => {
    votes.forEach(value => {
      if (mostVotes < value)
      setMostVotes(value)
    })
    var highestIndex = votes.indexOf(mostVotes)
    return (
      <div>
        <div>{anecdotes[highestIndex]}</div>
        <div>{votes[highestIndex]}</div>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>This anecdote has {votes[selected]} votes.</p>
      <Button handleClick={randomNumber} text='Next Anecdote' />
      <Button handleClick={vote} text='Vote' />

      <h1>Anecdote with Most Votes</h1>
      {calculateWinner()}
    </div>
  )
}

export default App