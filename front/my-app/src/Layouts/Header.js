import {useAuth} from "../Auth/Authenticator";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-#F5F5F5">
            <div className="flex items-center justify-between mx-auto p-4 max-w-7xl">
                {/* 로고 */}
                <a className="font-logo text-2xl font-bold text-gray-900" href={"/"}>
                    comma
                </a>

                {/* 네비게이션 메뉴 */}
                <div className="flex items-center space-x-8">
                    <ul className="flex items-center space-x-6">
                        <li>
                            <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="py-2 px-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* 로그인/프로필 섹션 */}
                    <div className="ml-6">
                        {user ? (
                            <div className="relative group">
                                <div className="w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 bg-white border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>

                                {/* Hover 드롭다운 메뉴 */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[1000]">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                                            Profile
                                        </a>
                                        <a href="/users/information" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                                            Settings
                                        </a>
                                        <hr className="my-1 border-gray-200" />
                                        <a
                                            onClick={async() => {
                                                await logout();
                                                navigate("/");
                                            }}
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <a
                                href="/users/Login"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                            >
                                LOGIN
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}