import React from 'react'

const Notification = ({ message, notifColor }) => {
  const notificationStyle = {
    color: notifColor ,
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 500
  }
  
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification