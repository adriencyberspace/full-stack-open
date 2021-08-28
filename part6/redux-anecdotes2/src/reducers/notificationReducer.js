let timer = 0

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'DISPLAY_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const displayNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(timer)
    timer = setTimeout(
      () =>
        dispatch({
          type: 'DISPLAY_NOTIFICATION',
          data: {
            notification: null,
          },
        }),
      time * 1000
    )

    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      data: {
        notification,
      },
    })
    
  }
}


export default notificationReducer


