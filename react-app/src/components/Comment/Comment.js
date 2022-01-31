import React from 'react';
import ButtonDeleteComment from '../ButtonDeleteAndUpdateComment/ButtonDeleteAndUpdateComment';

const Comment = ({ publicationsData, isAdmin }) => {


    let getToken = JSON.parse(localStorage.getItem('userData'));


    return (
        <>
            <ol>
                {publicationsData.comments.map(publicationsData => (
                    <li className="liComment" key={publicationsData.id}>
                        {isAdmin & getToken[0].userId !== publicationsData.users_idusers? <ButtonDeleteComment isAdmin={isAdmin} idComment={publicationsData.id} /> : ""}
                        {getToken[0].userId === publicationsData.users_idusers ? <ButtonDeleteComment contentComment={publicationsData.content} isAdmin={isAdmin} idComment={publicationsData.id} /> : ""}
                        <div className="nameAndSurnameComment">{publicationsData.user.name} {publicationsData.user.surname} {publicationsData.id}</div>
                        <div className="contentComment">{publicationsData.content}</div>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default Comment;