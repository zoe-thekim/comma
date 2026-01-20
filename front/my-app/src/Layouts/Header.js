import {useAuth} from "../Auth/Authenticator";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <nav >
            <div className={"bg-#F5F5F5 flex flex-wrap items-center justify-between mx-auto p-4 "}>
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
                        <li className={"px-5"}>
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  p-2 shadow" aria-labelledby="user-menu-button">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                {/*<span className="badge">New</span>*/}
                                            </a>
                                        </li>
                                        <li><a onClick={async() => {

                                            navigate("/member/information/home");
                                        }}>Settings</a></li>
                                        <li>
                                            <a className="" onClick={async() => {
                                                await logout();
                                                navigate("/");
                                            }} >Logout</a>
                                        </li>
                                    </ul>
                                </div>

                                // <button data-collapse-toggle="navbar-user" type="button"
                                //         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                //         aria-controls="navbar-user" aria-expanded="false">
                                //     <span className="sr-only">Open main menu</span>
                                //     <svg className="w-5 h-5" aria-hidden="true"
                                //          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                //         <path stroke="currentColor" stroke-linecap="round"
                                //               stroke-linejoin="round" stroke-width="2"
                                //               d="M1 1h15M1 7h15M1 13h15"/>
                                //     </svg>
                                // </button>

                                ) :

                                <a href="/Member/Login"
                                   className="block py-2 px-3 text-gray-900 hover:text-blue-700 dark:text-white font-medium">LOGIN</a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}