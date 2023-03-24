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
    case 'SET_BUILDS': {
      return {
        ...state,
        builds: action.payload
      }
    }
    case 'SET_BUILDFILTERSACTIVE': {
      return {
        ...state,
        buildFiltersActive: action.payload
      }
    }
    case 'SET_KEYSETS': {
      return {
        ...state,
        keysets: action.payload
      }
    }
    case 'SET_KEYSETSORT': {
      return {
        ...state,
        keysetSort: action.payload
      }
    }
    case 'SET_KEYSETDESC': {
      return {
        ...state,
        keysetDesc: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default Reducer
