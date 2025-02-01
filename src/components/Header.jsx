import { Link } from "react-router-dom";
import Menu from './Menu';
import User from './User';
import { LOGO } from "../api/data";

const Header = ()=> { 
    return (
        <div className="sts-header">
            <Link className="sts-logo" to="/student/dashboard">{LOGO}</Link>
            <div className="sts-header__menu-container">
                <Menu/>
            </div>
            <div className="sts-user_container">
                <User/>
            </div>
        </div>
    );
}


export default Header;

