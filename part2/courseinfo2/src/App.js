import React from 'react'

const Course = (props) => {

  const result = props.courses.map(course =>
    <div key={course.id}>
      <h1>{course.name}</h1>
      {course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
      <Sum course={course} />
    </div>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      <Course courses={courses} />
    </div>
  )
  
}

export default App