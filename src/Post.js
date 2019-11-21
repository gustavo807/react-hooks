import React from 'react'

function Post({title, author, description}){
    return (
        <div>
            <h4>{title}</h4>
            <h6>{author}</h6>
            <p>{description}</p>
        </div>
    )
}

export default Post