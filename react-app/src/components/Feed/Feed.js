import React, { useState, useRef } from 'react';
import Comment from '../Comment/Comment';
import Likes from '../Like/Like';
import './Feed.css';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Feed = ({ commentState }) => {

    const [isLoading, setIsLoading] = useState(false); // Si je veux mettre un spinner je pourrai utiliser ça
    const [isDefined, setIsDefined] = useState(false);
    const [content, setContent] = useState('');
    const formRef2 = useRef(null);
    const likeRef = useRef(null);
    const dislikeRef = useRef(null);

    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };
    console.log(content)

    const commentInfos = {
        content: content,
        publications_idpublications: "236",
        users_idusers: "35"
    }
    const onClickLike = (evt) => {
        evt.preventDefault();
        // Test d'envoyer le token dans le header

        let getToken = JSON.parse(localStorage.getItem('commandSignin'));
        console.log(getToken[0].token)

        // Fin de test 

        if (!commentState.id || !getToken) {
            return
        }
        fetch("http://localhost:3001/news/likes/add", {
            method: "POST",
            body: `publications_idpublications=${commentState.id}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            },
        })
    }

    const onSubmitComment = (evt) => {
        evt.preventDefault();
        // Test d'envoyer le token dans le header

        let getToken = JSON.parse(localStorage.getItem('commandSignin'));
        console.log(getToken[0].token)

        // Fin de test 

        if (!commentInfos.content || !commentInfos.publications_idpublications || !commentInfos.users_idusers) {
            return
        }
        console.log(commentInfos)
        fetch(formRef2.current.action, {
            method: formRef2.current.method,
            body: `content=${content}&publications_idpublications=${commentState.id}&users_idusers=${JSON.stringify(getToken[0].userId)}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            },
        })

    }
    console.log(formRef2)

    return (
        <div className="cardContainer">
            <li className="liPublication" key={commentState.id}>
                    <>
                        <div className="containerPublication">
                            <div className="nameAndSurnamePublication">{commentState.user.name} {commentState.user.surname}</div>
                            <div className="contentPublication">{commentState.content}</div>
                        </div>
                        <div className="containerComment">

                            {commentState.comments ? <Comment commentState={commentState} key={commentState.id} /> : "Aucun commentaire"}

                        </div>
                        <div className="containerLikePublication">
                            <button className="likeButton" ref={likeRef} type="button" onClick={onClickLike}><FontAwesomeIcon className="faThumbsUp" icon={faThumbsUp} /></button>
                            <div>
                                {commentState.likes ? <Likes commentState={commentState} key={commentState.id} /> : "0"}
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