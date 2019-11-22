import {useReducer, useEffect} from 'react'
import axios from 'axios'

const initialState = {
    isLoading: false,
    hasError: false,
    errorMessage: null,
    posts: []
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
          posts: action.payload
        }
      case "FETCH_FAIL":
        return {
          ...state,
          isLoading: false,
          hasError: true,
          errorMessage: action.payload
        }
      case "UPDATE_RECORD":
        return {
          ...state,
          posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post)
        }
      default:
        return state    
    }
  }

  function usePosts(){
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
      let didCancel = false

      console.log('usePosts')
      const loadData = async() => {
        dispatch({type: "FETCH_INIT"})
        try {
          const res = await axios.get('http://localhost:3000/posts')
          if(!didCancel){
            dispatch({type: "FETCH_SUCCESS", payload: res.data})
          }
          
        } catch (error) {
          if(!didCancel){
            dispatch({type: "FETCH_FAIL", payload: error.message})
          }
          
        }
      }
      loadData()
      return () => {
        didCancel = true
      }
    },[])

    const updateRecord = (postRec) => {
      dispatch({type: "UPDATE_RECORD", payload: postRec})
    }

    return {
        ...state,
        dispatch,
        updateRecord
    }
  }

  export default usePosts