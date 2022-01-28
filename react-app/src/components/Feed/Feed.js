import React, { useState, useRef } from 'react';
import Comment from '../Comment/Comment';
import Likes from '../Like/Like';
import './Feed.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit, faThumbsUp } from '@fortawesome/free-solid-svg-icons';



const Feed = ({ commentState, isAdmin }) => {


    const [content, setContent] = useState('');
    const [contentUpdatePublication, setContentUpdatePublication] = useState('');
    const [updatePublication, setUpdatePublication] = useState(false);
    const formRef2 = useRef(null);
    const likeRef = useRef(null);


    let getToken = JSON.parse(localStorage.getItem('commandSignin'));

    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };

    const onChangeContentUpdatePublication = (evt) => {
        setContentUpdatePublication(evt.target.value)
    };


    const onClickLike = (evt) => {
        evt.preventDefault();
        // Test d'envoyer le token dans le header

        let getToken = JSON.parse(localStorage.getItem('commandSignin'));

        // Fin de test 

        if (!commentState.id || !getToken) {
        } else {
            fetch("http://localhost:3001/news/likes/add", {
                method: "POST",
                body: `publications_idpublications=${commentState.id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': getToken[0].token
                },
            })
            window.location.reload(false);
        }

    }

    const onSubmitComment = (evt) => {
        evt.preventDefault();
        // Test d'envoyer le token dans le header

        let getToken = JSON.parse(localStorage.getItem('commandSignin'));

        // Fin de test 

        if (!content || !commentState.id || !getToken) {
            return
        }
        fetch(formRef2.current.action, {
            method: formRef2.current.method,
            body: `content=${content}&publications_idpublications=${commentState.id}&users_idusers=${JSON.stringify(getToken[0].userId)}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            },
        })
        window.location.reload(false);

    }

    const deletePublication = (evt) => {
        evt.preventDefault();



        fetch("http://localhost:3001/news/publications/delete", {
            method: "DELETE",
            mode: 'cors',
            body: `id=${commentState.id}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
        window.location.reload(false);
    }

    const displayUpdatePublication = (evt) => {
        evt.preventDefault();

        setUpdatePublication(true);
    }

    const buttonUpdatePublication = (evt) => {
        evt.preventDefault();

        fetch("http://localhost:3001/news/publications/update", {
            method: "POST",
            mode: "cors",
            body: `id=${commentState.id}&content=${contentUpdatePublication}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
    }

    return (
        <div className="cardContainer">
            <li className="liPublication" key={commentState.id}>
                <>

                    <div className="containerPublication">
                        <div>{isAdmin ? <button className="buttonDeletePublication" onClick={deletePublication}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} /> Supprimer la publication</button> : ""}</div>
                        <div>{isAdmin === false & getToken[0].userId === commentState.users_idusers ? <button className="buttonDeletePublication" onClick={deletePublication}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} /> Supprimer ma publication</button> : ""}</div>
                        <div>{isAdmin ? <button className="buttonDeletePublication" onClick={displayUpdatePublication}><FontAwesomeIcon className="faEdit" icon={faEdit} /> Modifier la publication</button> : ""}</div>
                        <div>{isAdmin === false & getToken[0].userId === commentState.users_idusers ? <button className="buttonDeletePublication" onClick={displayUpdatePublication}><FontAwesomeIcon className="faEdit" icon={faEdit} /> Modifier ma publication</button> : ""}</div>
                        <div>{updatePublication ?
                            <><textarea type="text" name="contentUpdatePublication" onChange={onChangeContentUpdatePublication} value={contentUpdatePublication} placeholder={commentState.content}></textarea> 
                            <button className="buttonUpdatePublication" type="button" onClick={buttonUpdatePublication}>Envoyer</button></>
                            : ""}</div>
                        
                        <div className="nameAndSurnamePublication">{commentState.user.name} {commentState.user.surname}</div>
                        <div className="contentPublication">{commentState.content}</div>
                    </div>
                    <div className="containerComment">

                        {commentState.comments ? <Comment isAdmin={isAdmin} commentState={commentState} key={commentState.id} /> : "Aucun commentaire"}

                    </div>
                    <div className="containerLikePublication">
                        <button className="likeButton" ref={likeRef} type="button" onClick={onClickLike}><FontAwesomeIcon className="faThumbsUp" icon={faThumbsUp} /></button>
                        <div>
                            {commentState.likes ? <Likes likesNumber={commentState.likes.length} /> : "0"}
                        </div>
                    </div>
                    <form className={commentState.id} method="POST" action="http://localhost:3001/news/comments/add" ref={formRef2} onSubmit={onSubmitComment}>
                        <textarea className="textareaCreateComment" id={commentState.id} type="text" name="content" onChange={onChangeContent} value={content} placeholder="Commenter..." />
                        <button className="buttonComment" type="submit">Envoyer</button>
                    </form>

                    <br />


                </>
            </li>
        </div>
    );
}

export default Feed;