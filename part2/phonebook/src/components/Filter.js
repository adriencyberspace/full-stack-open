import React from 'react'

const Filter = (props) => {
  return (
    <form>
      <div>
        Filter shown with: 
        <input 
          value={props.search}
          onChange={props.handleSearchChange}
        />
      </div>
    </form>
  )
}

export default Filter