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

export default Course