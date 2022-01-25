import React from 'react';
import './Like.css';

const Likes = ({ commentState }) => {


    console.log(commentState.likes)
    return (
        <>
            <div className="likePublication">{commentState.likes.length}</div>
        </>
    );
}

export default Likes;