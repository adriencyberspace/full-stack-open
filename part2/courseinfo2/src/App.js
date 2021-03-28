import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
    )
}

const Course = (props) => {
  const result = props.course.parts.map(part =>
    <p key={part.id}>{part.name} {part.exercises}</p>
    )

  return result
}

const Sum = (props) => {

  const array = props.course.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const sum = array.reduce(reducer)
  
  return (
    <p><strong>Total of {sum} exercises</strong></p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  
  return (
    <div>
      <Header course={course} />
      <Course course={course} />
      <Sum course={course} />
    </div>
  )
  
}

export default App