import { useState, useRef } from 'react';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function UpdatePublication({ commentState }) {


    const [contentUpdatePublication, setContentUpdatePublication] = useState('');
    
    const formUpdatePublicationRef = useRef(null);


    let getToken = JSON.parse(localStorage.getItem('commandSignin'));

    const onChangeContentUpdatePublication = (evt) => {
        setContentUpdatePublication(evt.target.value)
    };
    const buttonUpdatePublication = (evt) => {
        evt.preventDefault();
        console.log(new FormData(formUpdatePublicationRef.current.file))
        let formData = new FormData(formUpdatePublicationRef.current);
        formData.append('id', commentState.id);
        fetch("http://localhost:3001/news/publications/update", {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: new Headers({
                'Authorization': getToken[0].token
            })
        })
    }
    return (
        <div className="containerFlexbox">

            <form className="containerFlexbox" ref={formUpdatePublicationRef} onSubmit={buttonUpdatePublication}>
                <textarea type="text" name="content" onChange={onChangeContentUpdatePublication} value={contentUpdatePublication} placeholder={commentState.content}></textarea>
                <label className="labelUploadImage" htmlFor="imageUpdate"><FontAwesomeIcon className="faImage" icon={faImage} />Ajouter une image</label>
                <input className="inputFile" id="imageUpdate" type="file" name="image" />
                <button className="buttonUpdatePublication" type="submit">Envoyer</button>
            </form>

        </div>
    )

}

export default UpdatePublication;