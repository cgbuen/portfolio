import { useReducer } from 'react'
import Reducer from 'store/Reducer'
import initialState from 'store/initialState'

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(Reducer, initialState)
  return { globalState, globalDispatch }
}

export default useGlobalState
