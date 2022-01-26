import './PublicationInput.css';
import { useState, useRef } from 'react';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function PublicationInput() {

    const [content, setContent] = useState('');
    const formRef = useRef(null)



    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log(new FormData(formRef.current))
        // Récupération du token pour l'envoyer au backend

        let getToken = JSON.parse(localStorage.getItem('commandSignin'));
        console.log(getToken[0].token)

        let myHeaders = new Headers({ 'Authorization': getToken[0].token });


        if (!content) {
            return
        } else {

            fetch(formRef.current.action, {
                method: formRef.current.method,
                body: new FormData(formRef.current),
                headers: myHeaders,
            })
            window.location.reload(false);
        }
    }




    return (
        <div className="containerFlexbox">

            <form className="containerFlexbox" method="POST" action="http://localhost:3001/news/publications/add" ref={formRef} onSubmit={onSubmit}>
                <div className="containerTextareaCreatePublication">
                    <textarea className="textareaCreatePublication" id="content-upload" type="text" name="content" onChange={onChangeContent} value={content} placeholder="Quoi de neuf ?" />
                    <label className="labelUploadImage" htmlFor="image"><FontAwesomeIcon className="faImage" icon={faImage} />Ajouter une image</label>
                    <input className="inputFile" id="image" type="file" name="image" />
                    <button className="buttonAddPublication" type="submit">Envoyer</button>
                </div>
            </form>

        </div>
    )

}

export default PublicationInput;