import iconLeftFont from './icon-left-font-monochrome-black.svg';
import HeaderCss from './Header.css';

function Header() {

    return (
            <header>
                <img src={iconLeftFont} alt="" className="iconLeftFont" />
            </header>
    );
}

export default Header;