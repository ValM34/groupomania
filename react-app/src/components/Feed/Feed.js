import React, { useState, useRef } from 'react';
import Comment from '../Comment/Comment';
import Likes from '../Like/Like';
import './Feed.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';



const Feed = ({ commentState }) => {

    const [isLoading, setIsLoading] = useState(false); // Si je veux mettre un spinner je pourrai utiliser ça
    const [isDefined, setIsDefined] = useState(false);
    const [content, setContent] = useState('');
    const formRef2 = useRef(null);
    const likeRef = useRef(null);
    const dislikeRef = useRef(null);
    const [isAdmin, setIsAdmin] = useState(false);


    let getToken = JSON.parse(localStorage.getItem('commandSignin'));

    fetch("http://localhost:3001/users/isadmin", {
        method:"GET",
        headers: {'Authorization': getToken[0].token },
        mode: "cors",
        cache: "default"
    })
    .then(response => response.json())
    .then((isAdmin) => {setIsAdmin(isAdmin.isAdmin)})
                

    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };

    const commentInfos = {
        content: content,
        publications_idpublications: "236",
        users_idusers: "35"
    }
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
    console.log(commentState.id)

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

    return (
        <div className="cardContainer">
            <li className="liPublication" key={commentState.id}>
                <>

                    <div className="containerPublication">
                        <div>{isAdmin ? <button className="buttonDeletePublication" onClick={deletePublication}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} /> Supprimer la publication</button> : ""}</div>
                        <div>{getToken[0].userId === commentState.users_idusers ? <button className="buttonDeletePublication" onClick={deletePublication}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} /> Supprimer ma publication</button> : ""}</div>
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