import React, {useContext, useRef} from 'react'
import { ConfigContext } from './App'

function Description(){
    const configContext = useContext(ConfigContext)
    const ref = useRef()

    const handleClick = (e) => {
        ref.current.focus()
        console.log(ref.current.value)
    }
    console.log('description')

    return(
        <div>
            Description
            <p>{JSON.stringify(configContext, 2)}</p>
            <input type="text" ref={ref} />
            <button onClick={handleClick}>Focus</button>
        </div>
    )
}

export default Description