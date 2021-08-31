import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'


const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null
  }

  // This needs to go below the loading handler
  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <AuthorForm />
    </div>
  )
}

export default Authors
