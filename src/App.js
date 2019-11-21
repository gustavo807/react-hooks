import React from 'react'
import usePosts from './usePosts'
import Description from './Description'

export const ConfigContext = React.createContext()
const configValue = {
  name: 'gustavo', email: 'gustavo@mail.com'
}

function App() {

  const {isLoading, posts, hasError, errorMessage} = usePosts()

  if(isLoading) return <div>Loading...</div>
  if(hasError) return <div>Error: {errorMessage}</div>

  return posts && (
    <ConfigContext.Provider value={configValue}>
      <p>React app</p>
      <div>{JSON.stringify(posts, 2)}</div>
      
      <Description/>
      
    </ConfigContext.Provider>
  );
}

export default App;
