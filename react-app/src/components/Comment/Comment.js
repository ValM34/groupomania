import React from 'react';
import ButtonDeleteComment from '../ButtonDeleteComment/ButtonDeleteComment';
import './Comment.css';

const Comment = ({ commentState, isAdmin }) => {


    let getToken = JSON.parse(localStorage.getItem('commandSignin'));


    return (
        <>
            <ol>
                {commentState.comments.map(commentState => (
                    <li className="liComment" key={commentState.id}>
                        {isAdmin & getToken[0].userId !== commentState.users_idusers? <ButtonDeleteComment isAdmin={isAdmin} idComment={commentState.id} /> : ""}
                        {getToken[0].userId === commentState.users_idusers ? <ButtonDeleteComment isAdmin={isAdmin} idComment={commentState.id} /> : ""}
                        <div className="nameAndSurnameComment">{commentState.user.name} {commentState.user.surname} {commentState.id}</div>
                        <div className="contentComment">{commentState.content}</div>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default Comment;