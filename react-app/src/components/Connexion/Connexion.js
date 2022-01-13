import ConnexionCss from './Connexion.css'

function Connexion(props) {

    return (
        <div>

            <form className="formIndex">
                <div className="containerSignup">
                    <button onClick={() => props.func()} className="buttonSignup" type="button" id="buttonSwitch">Pas encore de compte ?</button>
                    <label htmlFor="email">Adresse email :</label><input required type="email" name="email" id="email" placeholder="adresse email" maxLength="255" />
                    <label htmlFor="password">Mot de passe :</label><input required type="password" name="password" id="password" placeholder="mot de passe" maxLength="255" />
                    <button className="buttonSignup" type="button" id="buttonEvent">Connexion</button>
                </div>

            </form>

        </div>
    )

}

export default Connexion;