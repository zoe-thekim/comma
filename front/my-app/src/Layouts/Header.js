import {useAuth} from "../Auth/Authenticator";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={"navbar bg-base-100 shadow-sm"}>
            <div className="flex-1">
                <a class="font-logo" href={"/"}>comma</a>
            </div>
            <div className={"flex-none"}>
                <ul className={"menu menu-horizontal px-1"}>
                    <li><a>About</a></li>
                    <li><a>Features</a></li>
                    {user ? (
                        <li>
                            <a className="nav-link" onClick={async() => {
                                await logout();
                                navigate("/");
                            }} >LogOut</a>
                        </li>
                        ) :
                        <li>
                            <a className="nav-link" href="/Member/Login">Login</a>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}