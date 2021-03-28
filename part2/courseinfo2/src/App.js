import React from 'react'


// const Part = (props) => {
//   return (
//     <div>
//       <p>{props.parts[0].name} {props.parts[0].exercises}</p>
//       <p>{props.parts[1].name} {props.parts[1].exercises}</p>
//       <p>{props.parts[2].name} {props.parts[2].exercises}</p>
//     </div>
//   )
// }

// const Content = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <Part parts={props.parts} />
//     </div>
//   )
// }

// const Totals = (props) => {
//   return (
//     <div>
//       <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
//     </div>
//   )
// }

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
      }
    ]
  }
  
  
  return (
    <div>
      <Header course={course} />
      <Course course={course} />
    </div>
  )
  
}

export default App