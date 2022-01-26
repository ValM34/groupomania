import React from 'react';

const ButtonDeleteComment = ({ idComment }) => {


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
            <button onClick={deleteComment}>Supprimer le commentaire</button>
        </>
    );
}

export default ButtonDeleteComment;