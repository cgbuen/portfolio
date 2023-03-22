const Reducer = (state, action) => {
  switch(action.type) {
    case 'SET_PROJECTS': {
      return {
        ...state,
        projects: action.payload
      }
    }
    case 'SET_PHOTOS': {
      return {
        ...state,
        photos: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default Reducer
