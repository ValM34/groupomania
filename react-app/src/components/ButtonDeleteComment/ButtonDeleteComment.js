import React, { useState } from 'react';
import './ButtonDeleteComment.css';
import { faMinusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonDeleteComment = ({ idComment, contentComment, isAdmin }) => {

    const [contentUpdateComment, setContentUpdateComment] = useState('');
    const [updateComment, setUpdateComment] = useState(false);


    let getToken = JSON.parse(localStorage.getItem('commandSignin'));

    const deleteComment = (evt) => {
        evt.preventDefault();


        fetch("http://localhost:3001/news/comments/delete", {
            method: "DELETE",
            mode: 'cors',
            body: `id=${idComment}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
        window.location.reload(false);
    }

    const displayUpdateComment = (evt) => {
        evt.preventDefault();

        setUpdateComment(true);
    }

    const buttonUpdateComment = (evt) => {
        evt.preventDefault();

        fetch("http://localhost:3001/news/comments/update", {
            method: "POST",
            mode: "cors",
            body: `id=${idComment}&content=${contentUpdateComment}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
    }
    const onChangeContentUpdateComment = (evt) => {
        setContentUpdateComment(evt.target.value)
    };


    return (
        <>
            {isAdmin ? <button className="buttonDeleteComment" onClick={deleteComment}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} />supprimer le commentaire</button> : <button className="buttonDeleteComment" onClick={deleteComment}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} />supprimer mon commentaire</button>}
            {isAdmin ? <button className="buttonDeleteComment" onClick={displayUpdateComment}><FontAwesomeIcon className="faEdit" icon={faEdit} />Modifier le commentaire</button> : <button className="buttonDeleteComment" onClick={displayUpdateComment}><FontAwesomeIcon className="faEdit" icon={faEdit} />Modifier mon commentaire</button>}
            <div>{updateComment ?
                <><textarea type="text" name="contentUpdatePublication" onChange={onChangeContentUpdateComment} value={contentUpdateComment} placeholder={contentComment}></textarea>
                    <button className="buttonUpdatePublication" type="button" onClick={buttonUpdateComment}>Envoyer</button></>
                : ""}</div>
        </>
    );
}

export default ButtonDeleteComment;