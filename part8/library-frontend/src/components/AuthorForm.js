import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS}],
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        Author Name 
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a, i) =>
            <option key={i} value={a.name}>{a.name}</option>
          )}
        </select>
        <input type="hidden" value={name}/>
        <div>
          Born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default AuthorForm