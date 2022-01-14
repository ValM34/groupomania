import InscriptionCss from './Inscription.css'

function Inscription(props) {


    return (
        <div>
            <form className="formIndex">


                <div className="containerSignup">
                    <div className="divSwitchSignin">
                        <button onClick={() => props.func()} className="buttonSwitchSignin" type="button" id="buttonSwitch">Connexion</button>
                        <div className="ongletSwitchSignin">Inscription</div>
                    </div>
                    <label htmlFor="surname">Nom :</label><input required type="text" name="surname" id="surname" placeholder="nom" maxLength="255" />
                    <label htmlFor="name">Prénom :</label><input required type="text" name="name" id="name" placeholder="prénom" maxLength="255" />
                    <label htmlFor="email">Adresse email :</label><input required type="email" name="email" id="email" placeholder="adresse email" maxLength="255" />
                    <label htmlFor="password">Mot de passe :</label><input required type="password" name="password" id="password" placeholder="mot de passe" maxLength="255" />
                    <button className="buttonSignup" type="button" id="buttonEvent">Inscription</button>
                </div>

            </form>

        </div>
    )

}

export default Inscription;