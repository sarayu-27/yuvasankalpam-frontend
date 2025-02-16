import { Link } from "react-router-dom";
import Menu from './Menu';
import User from './User';
import { LOGO,userType} from "../api/data";
import { useEffect,useState } from "react";

const Header = ()=> { 
    const [path,setPath] = useState('');
    useEffect(()=>{
        if(userType == 'Faculty') setPath('/student/dashboard') 
        if(userType == 'Student') setPath('/faculty/dashboard')
    },[userType])
    return (
        <div className="sts-header">
            <Link className="sts-logo" to={path}>{LOGO}</Link>
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

