import React from 'react'
import usePosts from './usePosts'
import Description from './Description'
import Post from './Post'
import axios from 'axios'

export const ConfigContext = React.createContext()
const configValue = {
  name: 'gustavo', email: 'gustavo@mail.com'
}

function App() {

  const {isLoading, posts, hasError, errorMessage, updateRecord} = usePosts()

  const handleLikeClick = (e, postRec) => {
    console.log('handleClick')
    axios.put(`http://localhost:3000/posts/${postRec.id}`,{...postRec, likes: ++postRec.likes})
      .then(res => {
        console.log('success', res)
        updateRecord(postRec)
      })
      .catch(err => {
        console.log('err', err)
      })
  }


  if(isLoading) return <div>Loading...</div>
  if(hasError) return <div>Error: {errorMessage}</div>

  return  (
    <ConfigContext.Provider value={configValue}>
      <p>React app</p>
      <div>{JSON.stringify(posts, 2)}</div>

      {posts.map(post => <Post 
        key={post.id} title={post.title} author={post.author} description={post.description} likes={post.likes}
        id={post.id} heartLikeEvent={handleLikeClick} />)}
      
      <Description/>
      
    </ConfigContext.Provider>
  );
}

export default App;
