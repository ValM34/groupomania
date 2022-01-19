import { useState, useRef } from 'react';


function TestFormulaire() {

    const [id, setId] = useState('35');
    const [content, setContent] = useState('Le content de ma publication');
    const formRef = useRef(null)

    const onChangeId = (evt) => {
        setId(evt.target.value)
    };

    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };

    const onSubmit = (evt) => {
        evt.preventDefault();

        if(!formRef) {
            return
        }

        fetch(formRef.current.action, {
            method: formRef.current.method,
            body: new FormData(formRef.current)
        })

    }


    return (
        <div className="TestFormulaire">
            <h1>Mes photos de vacances</h1>
            <form 
            method="POST"
            action="http://localhost:3001/news/publications/add"
            ref={formRef}
            onSubmit={onSubmit}>
                <div>
                    <label htmlFor="fullname-upload">Nom</label>
                    <input
                        id="fullname-upload"
                        type="text"
                        name="users_idusers"
                        onChange={onChangeId}
                        value={id}
                        ></input>
                        <label htmlFor="content-upload">Content</label>
                        <input
                        id="content-upload"
                        type="text"
                        name="content"
                        onChange={onChangeContent}
                        value={content}
                        ></input>
                </div>
                <div>
                    <label htmlFor="file-upload">Uploader fichier</label>
                    <input id="file-upload" type="file" name="image" />
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default TestFormulaire;