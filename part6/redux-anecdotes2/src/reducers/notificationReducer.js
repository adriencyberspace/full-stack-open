const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'DISPLAY_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const displayNotification = (notification) => {
  return {
    type: 'DISPLAY_NOTIFICATION',
    data: {
      notification
    }
  }
}


export default notificationReducer