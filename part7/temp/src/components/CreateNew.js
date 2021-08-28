import React from 'react'
import  { useField } from '../hooks'

const CreateNew = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    })
    handleReset(e)
  }

  const handleReset = (e) => {
    e.preventDefault()
    title.reset()
    author.reset()
    url.reset()
  }


  return (
    <div>
      <h2>Create New</h2>
      <form id="blog-form" onSubmit={handleSubmit}>
        <div>
          title
          <input {...title.selectAttributes()}/>
        </div>
        <div>
          author
          <input {...author.selectAttributes()}/>
        </div>
        <div>
          url
          <input {...url.selectAttributes()}/>
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew