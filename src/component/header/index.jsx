import React from 'react'
import { useCookies } from "react-cookie"
import { LOGIN_PATH } from "../../path";
import { USER_DETAILS, PROFILE_DETAILS } from '../../constant';
import "./style.css"
import Avatar from "../../images/avatar.jpg"

const Header = ({ history }) => {
    const [cookie, setCookie, removeCookie] = useCookies([USER_DETAILS])

    const handleLogout = () => {
        removeCookie(USER_DETAILS);
        localStorage.removeItem(PROFILE_DETAILS);   
        history.push(LOGIN_PATH);
    }

    return (
        <header className="container">
            <div className="row">
                <div className="col-sm-2">
                    <img src={cookie[USER_DETAILS].imgUrl || Avatar} alt="Avatar" className="avatar" />
                </div>
                <div className="col-sm-8">
                    { cookie[USER_DETAILS] && 
                        <span className="mt-3 pull-right">{cookie[USER_DETAILS].email}</span>
                    }
                </div>
                <div className="col-sm-2">
                    <input type="button" className="button" value="Logout" onClick={handleLogout} />
                </div>
            </div>
        </header>
    )
}

export default Header;
