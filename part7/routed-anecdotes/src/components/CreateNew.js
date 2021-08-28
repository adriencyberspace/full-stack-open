import React from 'react'
import  { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    handleReset(e)
  }

  const handleReset = (e) => {
    e.preventDefault();
    content.reset()
    author.reset()
    info.reset()
  }
  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="anecdote-form" onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.selectAttributes()}/>
        </div>
        <div>
          author
          <input {...author.selectAttributes()}/>
        </div>
        <div>
          url for more info
          <input {...info.selectAttributes()}/>
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew