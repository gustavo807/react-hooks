import React from 'react'

function Post({id, title, author, description, likes, heartLikeEvent}){
    console.log('post')
    return (
        <div>
            <h4>{title}</h4>
            <h6>{author}</h6>
            <p>{description}</p>
            <button onClick={e => heartLikeEvent(e, {id, title, author, description, likes})}>Like</button><p>Likes {likes}</p>
        </div>
    )
}

export default Post