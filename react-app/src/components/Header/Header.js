import iconLeftFont from './icon-left-font-monochrome-black.svg';

function Header({ isNotLogged }) {

    let getToken = JSON.parse(localStorage.getItem('commandSignin'));

    const deleteUser = () => {
        fetch("http://localhost:3001/users/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken[0].token
            }
        });
        window.location.reload(false);
    }

    return (
            <header>
                <div className="imgHeader">
                <img src={iconLeftFont} alt="" className="iconLeftFont" />
                </div>
                {isNotLogged ? "" : <button className="buttonDeleteAccount" onClick={deleteUser}>Supprimer mon compte</button>}
            </header>
    );
}

export default Header;