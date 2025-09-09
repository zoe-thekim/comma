import {useAuth} from "../Auth/Authenticator";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <nav >
            <div className={"bg-#F5F5F5 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 "}>
                <a className="font-logo" href={"/"}>comma
                </a>

                {/*<div className={"items-center justify-between hidden w-full ml-auto md:flex md:w-auto md:border-1"}>*/}
                {/*    <ul className={"flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 md:flex-row "}>*/}
                {/*        <li><a>About</a></li>*/}
                {/*        <li><a>Features</a></li>*/}
                {/*        <li><a>Product</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                {/*<div className={"flex item-center md:order-2 space-x3 md:space-x-0 rtl:space-x-reverse"}>*/}
                {/*    <button type={"button"} className={""}>*/}
                {/*        {user ? (*/}
                {/*                <a className="nav-link" onClick={async() => {*/}
                {/*                    await logout();*/}
                {/*                    navigate("/");*/}
                {/*                }} >LOGOUT</a>*/}
                {/*        ) :*/}
                {/*            <a className="nav-link" href="/Member/Login">LOGIN</a>*/}

                {/*    } </button>*/}
                {/*</div>*/}
                <div className="items-center hidden w-full md:flex md:w-auto ml-auto" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li><a href="#"
                               className="block py-2 px-3 text-gray-900 hover:text-blue-700 dark:text-white">About</a>
                        </li>
                        <li><a href="#"
                               className="block py-2 px-3 text-gray-900 hover:text-blue-700 dark:text-white">Services</a>
                        </li>
                        <li><a href="#"
                               className="block py-2 px-3 text-gray-900 hover:text-blue-700 dark:text-white">Pricing</a>
                        </li>
                        <li><a href="#"
                               className="block py-2 px-3 text-gray-900 hover:text-blue-700 dark:text-white">Contact</a>
                        </li>
                        <li className={"py-2"}>
                                <a type={"button"} className={"block px-3"}>
                                    {user ? (
                                            <a className="" onClick={async() => {
                                                await logout();
                                                navigate("/");
                                            }} >LOGOUT</a>
                                    ) :
                                        <a className="block px-3 " href="/Member/Login">LOGIN</a>
                                } </a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}