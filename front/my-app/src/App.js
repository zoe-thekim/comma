import React, { Component, Fragment } from 'react';
import './App.css';
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Auth/Authenticator";
import Home from "./Layouts/Home";
import Login from "./users/Login";
import Join from "./users/Join";
import Success from "./users/Success";
import Information from "./users/Information";
import ProductCategories from "./product/ProductCategories";
import ProductList from "./product/ProductList";
import ProductDetail from "./product/ProductDetail";

class App extends Component {
    render() {
        return (
            <div className={"bg-neutral-100"}>
            <Router>
                <AuthProvider>
                    <Fragment>
                        <Header />
                        <div >
                            <Routes>
                                {/* 홈 */}
                                <Route path="/" element={<Home />} />

                                {/* ✅ 소문자 기준 라우트 */}
                                <Route path="/users/Login" element={<Login />} />
                                <Route path="/users/Join" element={<Join />} />
                                <Route path="/users/information" element={<Information />} />
                                <Route path="/users/google" element={<Navigate to="/member/google" replace />} />

                                {/* 상품 관련 라우트 */}
                                <Route path="/product" element={<ProductCategories />} />
                                <Route path="/product/list" element={<ProductList />} />
                                <Route path="/product/detail/:id" element={<ProductDetail />} />

                                {/* 이전 item 라우트 호환용 */}
                                <Route path="/item/list" element={<Navigate to="/product/list" replace />} />
                                <Route path="/item/detail/:id" element={<Navigate to={`/product/detail/${window.location.pathname.split('/')[3]}`} replace />} />

                                {/* 호환용(대문자로 접근해도 소문자로 리다이렉트) */}
                                <Route path="/users/Login" element={<Navigate to="/users/Login" replace />} />
                                <Route path="/users/Join" element={<Navigate to="/users/Join" replace />} />
                                <Route path="/users/Google" element={<Navigate to="/users/google" replace />} />

                                <Route path="/Users/Information/Home" element={<Navigate to="/users/information" replace />} />
                            </Routes>
                        </div>
                        <Footer />
                    </Fragment>
                </AuthProvider>
            </Router>
            </div>
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
