const Reducer = (state, action) => {
  switch(action.type) {
    case 'SET_PROJECTS': {
      return {
        ...state,
        projects: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default Reducer
