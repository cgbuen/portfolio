import React from 'react'
import useGlobalState from 'store/useGlobalState'
import Context from 'store/context'

const GlobalStateProvider = ({children}) => {
  return (
    <Context.Provider value={useGlobalState()}>
      {children}
    </Context.Provider>
  )
}

export default GlobalStateProvider
