import './PublicationInput.css';
import { useState, useRef } from 'react';


function PublicationInput() {
    /*
    const [stateTextarea, setStateTextarea] = useState();

    const linkedTextarea = (e) => {
        setStateTextarea(e);
    }

    // test attachment 
    const [stateImg, setStateImg] = useState();

    const linkedImg = (e) => {
        setStateImg(e);
    }
    // test attachment

    */
    // nouveau test attachment
    const [id, setId] = useState('35');
    const [content, setContent] = useState('');
    const formRef = useRef(null)

    const onChangeId = (evt) => {
        setId(evt.target.value)
    };

    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        console.log(new FormData(formRef.current))

        if (!formRef) {
            return
        }

        fetch(formRef.current.action, {
            method: formRef.current.method,
            body: new FormData(formRef.current)
        })

    }
    // fin nouveau test attachment




    return (
        <div className="containerFlexbox">
            




            <form className="containerFlexbox" method="POST" action="http://localhost:3001/news/publications/add" ref={formRef} onSubmit={onSubmit}>
                <div className="containerTextareaCreatePublication">
                        <label htmlFor="users_idusers">Id</label>
                        <input id="users_idusers" type="text" name="users_idusers" onChange={onChangeId} value={id} />

                        <textarea className="textareaCreatePublication" id="content-upload" type="text" name="content" onChange={onChangeContent} value={content} placeholder="Quoi de neuf, [Nom de la personne] ?" />

                        <label htmlFor="image">Icone upload un fichier</label>
                        <input className="inputFile" id="image" type="file" name="image" />
                    <button className="buttonAddPublication" type="submit">Envoyer</button>
                </div>
            </form>



        </div>
    )

}

export default PublicationInput;