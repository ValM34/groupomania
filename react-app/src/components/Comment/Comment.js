import React from 'react';
import './Comment.css';

const Feed = ({ commentState }) => {





    return (
        <>
            <ol>
                {commentState.comments.map(commentState => (
                    <li className="liComment" key={commentState.id}>
                        <div className="nameAndSurnameComment">{commentState.user.name} {commentState.user.surname}</div>
                        <div className="contentComment">{commentState.content}</div>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default Feed;