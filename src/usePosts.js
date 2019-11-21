import {useReducer, useEffect} from 'react'
import axios from 'axios'

const initialState = {
    isLoading: false,
    hasError: false,
    errorMessage: null,
    posts: null
  }
  
  const reducer = (state, action) => {
    switch(action.type){
      case "FETCH_INIT":
        return {
          ...state,
          isLoading: true
        }
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          posts: [action.payload]
        }
      case "FETCH_FAIL":
        return {
          ...state,
          isLoading: false,
          hasError: true,
          errorMessage: action.payload
        }
      default:
        return state    
    }
  }

  function usePosts(){
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
      const loadData = async() => {
        dispatch({type: "FETCH_INIT"})
        try {
          const res = await axios.get('http://localhost:3000/posts')
          dispatch({type: "FETCH_SUCCESS", payload: res.data})
        } catch (error) {
          dispatch({type: "FETCH_FAIL", payload: error.message})
        }
      }
      loadData()
    },[])

    return {
        ...state,
        dispatch
    }
  }

  export default usePosts