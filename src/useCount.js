import React, {useReducer} from 'react'

const reducer = (state, action) => {
    switch(action.type){
      case "ADD":
        return {
          ...state, 
          num: ++state.num
        }
      case "REMOVE":
        return {
          ...state,
          num: --state.num
        }
      case "RESET":
        return {
          ...state,
          num: 0
        }
      default:
        return state
    }
  }

const useCount = (initialState) =>  {
    const [state, dispatch] = useReducer(reducer, initialState)

    return {
        ...state,
        dispatch
    }
}

export default useCount