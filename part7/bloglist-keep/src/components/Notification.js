import React from 'react'

const Notification = ({ props }) => {

  const notificationStyle = {
    color: 'black' ,
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 500
  }

  return (
    <div className="notification" style={notificationStyle}>
      {props.notification}
    </div>
  )
}

export default Notification