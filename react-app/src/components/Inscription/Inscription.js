import './Inscription.css';
import { useState, useRef } from 'react';

function Inscription(props) {


    const [errorState, setErrorState] = useState(false);


    const refSurname = useRef(null);
    const refName = useRef(null);
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refForm = useRef(null);

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

    const onSubmit = (e) => {
        e.preventDefault();

        const userInfos = {
            surname: refSurname.current.value,
            name: refName.current.value,
            email: refEmail.current.value,
            password: refPassword.current.value,
        }

        if (!userInfos.surname || !userInfos.name || !EMAIL_REGEX.test(userInfos.email) || !PASSWORD_REGEX.test(userInfos.password)) {
            setErrorState(true);
        } else {
            fetch(refForm.current.action, {
                method: refForm.current.method,
                body: JSON.stringify(userInfos),
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then((infosUser) => {
                    console.log(infosUser);
                    window.location.reload(false);
                })
        }
    }

    return (
        <div>
            <form className="formIndex" method="POST" action="http://localhost:3001/users/signup" ref={refForm} onSubmit={onSubmit}>


                <div className="containerSignup">
                    <div className="divSwitchSignin">
                        <button onClick={() => props.func()} className="buttonSwitchSignin" type="button" id="buttonSwitch">Connexion</button>
                        <div className="ongletSwitchSignin">Inscription</div>
                    </div>
                    <label htmlFor="surname">Nom :</label><input ref={refSurname} required type="text" name="surname" id="surname" placeholder="nom" maxLength="255" />
                    <label htmlFor="name">Prénom :</label><input ref={refName} required type="text" name="name" id="name" placeholder="prénom" maxLength="255" />
                    <label htmlFor="email">Adresse email :</label><input ref={refEmail} required type="email" name="email" id="email" placeholder="adresse email" maxLength="255" />
                    <label htmlFor="password">Mot de passe :</label><input ref={refPassword} required type="password" name="password" id="password" placeholder="mot de passe" maxLength="255" />
                    {errorState ? <div>Veuillez renseigner tous les champs. Le mot de passe doit contenir au moins 8 caractères dont 1 lettre minuscule, 1 lettre majuscule et 1 chiffre.</div> : <div>Votre compte a bien été enregistré. Vous pouvez maintenant vous connecter.</div>}
                    <button className="buttonSignup" type="submit" id="buttonEvent">Inscription</button>
                </div>

            </form>

        </div>
    )

}

export default Inscription;