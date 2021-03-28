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


  const randomNumber = () => {
    const number = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(number)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  return (
    <div>
      {anecdotes[selected]}
      <p>This anecdote has {votes[selected]} votes.</p>
      <Button handleClick={randomNumber} text='Next Anecdote' />
      <Button handleClick={vote} text='Vote' />
  
    </div>
  )
}

export default App