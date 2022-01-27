import React from 'react';
import './ButtonDeleteComment.css';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonDeleteComment = ({ idComment, isAdmin }) => {


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


    return (
        <>
            {isAdmin ? <button className="buttonDeleteComment" onClick={deleteComment}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} />supprimer le commentaire</button> : <button className="buttonDeleteComment" onClick={deleteComment}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} />supprimer mon commentaire</button>}
        </>
    );
}

export default ButtonDeleteComment;