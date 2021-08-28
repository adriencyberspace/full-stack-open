import React, { useState } from 'react'

const Statistic = (props) => {
    
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.statistics.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={props.statistics.good} />
          <Statistic text="Neutral" value={props.statistics.neutral} />
          <Statistic text="Bad" value={props.statistics.bad} />
          <Statistic text="Total" value={props.statistics.total} />
          <Statistic text="Average" value={props.statistics.average} />
          <Statistic text="Positive" value={props.statistics.positive} />
        </tbody>
      </table>
      
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const average  = ((good*1) + (bad*-1)) / total;
  const positive = ((good / total)*100) +'%';
  
  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: average,
    positive: positive
  }


  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={goodClick} text='Good' />
      <Button handleClick={neutralClick} text='Neutral' />
      <Button handleClick={badClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App