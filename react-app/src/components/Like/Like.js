import React from 'react';
import './Like.css';

const Likes = ({ likesNumber }) => {


    return (
        <>
            <div className="likePublication">{likesNumber}</div>
        </>
    );
}

export default Likes;