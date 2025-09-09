import React, { Component, Fragment } from 'react';
import './App.css';
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Auth/Authenticator";
import Home from "./Layouts/Home";
import Login from "./Member/Login";
import Join from "./Member/Join";
import Success from "./Member/Success";

class App extends Component {
    render() {
        return (
            <Router>
                <AuthProvider>
                    <Fragment>
                        <Header />
                        <div>
                            <Routes>
                                {/* 홈 */}
                                <Route path="/" element={<Home />} />

                                {/* ✅ 소문자 기준 라우트 */}
                                <Route path="/member/login" element={<Login />} />
                                <Route path="/member/join" element={<Join />} />
                                <Route path="/member/google" element={<Navigate to="/member/google" replace />} />


                                {/* 호환용(대문자로 접근해도 소문자로 리다이렉트) */}
                                <Route path="/Member/Login" element={<Navigate to="/member/login" replace />} />
                                <Route path="/Member/Join" element={<Navigate to="/member/join" replace />} />
                                <Route path="/Member/Google" element={<Navigate to="/member/google" replace />} />
                            </Routes>
                        </div>
                        <Footer />
                    </Fragment>
                </AuthProvider>
            </Router>
        );
    }
}

export default App;

// function App() {
//     return (
//         <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//             <h1 className="text-5xl font-bold text-white drop-shadow-lg">
//                 Tailwind 적용 완료 🎉
//             </h1>
//         </div>
//     );
// }
//
// export default App;
