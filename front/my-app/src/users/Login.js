import {useState} from "react";
import axios from "axios";
import {api} from "../api";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../Auth/Authenticator";

export default function Login() {
    const [user_email, setUserEmail] = useState("");
    const [user_pwd, setUserPwd] = useState("");
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    async function onSubmit(e){
        e.preventDefault();
        try{
            await login(user_email, user_pwd);
            alert("로그인 성공");
            navigate("/");
        }catch(err){
            alert("로그인 실패");
            console.error(err?.response?.data || err.message);
        }
    }

    const [isSignUp, setIsSignUp] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 1250);
        setIsSignUp(!isSignUp);
    };

    const handleGoogleClick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

    const handlePasswordCheckChange = (e) => {
        const value = e.target.value;
        setPasswordCheck(value);
        setPasswordMatch(signUpData.password === value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 일치 확인
        if (!passwordMatch || signUpData.password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            console.log("회원가입 시작");
            const result = await register(signUpData.email, signUpData.password);

            console.log("회원가입 성공 응답 : ", result);
            if (result.status === "OK" || result.memberId) {
                alert("회원가입 성공");
                navigate("/");
            }
        } catch (err) {
            console.error("전체 에러:", err); // 전체 에러 객체
            console.error("에러 응답:", err?.response); // 응답 객체
            console.error("에러 데이터:", err?.response?.data); // 응답 데이터
            console.error("에러 상태:", err?.response?.status); // HTTP 상태 코드
            console.error("에러 메시지:", err.message); // 에러 메시지

            const errorMessage = err?.response?.data?.message || "회원가입 실패";
            alert(errorMessage);
            console.error("SIGNUP ERROR:", err?.response?.status, err?.response?.data || err.message);
        }
    };

    // const ToJoin = () => {
    //     navigate("/Member/Join");
    // };
    //
    const [isLogin, setIsLogin] = useState(true);

    // const toggleForm = () => setIsLogin(!isLogin);

    const changeForm = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);
        setIsLogin(!isLogin);
    };
    return (
        // 회원가입 부분
        <div className="w-full min-h-screen flex justify-center items-center bg-#F5F5F5 font-sans text-xs text-gray-500">
            <div className="flex w-2xl max-w-5xl min-h-[500px] h-[600px] p-6 bg-gray-100 shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] rounded-3xl overflow-hidden scale-75 lg:scale-90 xl:scale-100">
                <div className="w-1/2 flex justify-center items-center h-full p-6 bg-gray-100 z-10">
                    <div className="flex justify-center items-center flex-col w-full h-full">
                        <h2 className="text-3xl font-bold leading-[3] text-gray-900 mb-8">Create Account</h2>

                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Name"*/}
                        {/*    value={signUpData.name}*/}
                        {/*    onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}*/}
                        {/*    className="w-[350px] h-10 my-1 px-6 text-sm tracking-wide border-none outline-none bg-#F5F5F5 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"*/}
                        {/*/>*/}

                        <input
                            type="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                            className="w-[350px] h-10 my-1 px-6 text-sm tracking-wide border-none outline-none bg-#F5F5F5 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                            className="w-[350px] h-10 my-1 px-6 text-sm tracking-wide border-none outline-none bg-#F5F5F5 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                        />

                        <input
                            type="password"
                            placeholder="Password CHECK"
                            value={passwordCheck}
                            onChange={handlePasswordCheckChange}
                            className={`w-[350px] h-10 my-1 px-6 text-sm tracking-wide border-none outline-none bg-#F5F5F5 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 ${
                                !passwordMatch && passwordCheck !== "" ? "shadow-[inset_2px_2px_4px_#ff6b6b,inset_-2px_-2px_4px_#ffffff]" : ""
                            }`}
                        />
                        {!passwordMatch && passwordCheck !== "" && (
                            <p className="text-red-500 text-xs mt-1 px-2">비밀번호가 일치하지 않습니다.</p>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="w-[180px] h-12 bg-neutral-100 rounded-[40px] mt-12 font-bold text-sm tracking-widest ext-white shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_10px_#d1d9e6,-6px_-6px_10px_#ffffff] hover:scale-[0.985] active:shadow-[2px_2px_6px_#d1d9e6,-2px_-2px_6px_#ffffff] active:scale-[0.97] transition-all duration-300">
                            JOIN
                        </button>
                    </div>
                </div>

                 {/*로그인 부분*/}
                <div className={`w-1/2 flex justify-center items-center w-1/2 h-full p-6 bg-#F5F5F5 transition-all duration-[1250ms] z-10`}>
                    <div className="flex justify-center items-center flex-col w-full h-full">
                        <h2 className="text-3xl font-bold leading-[3] text-gray-900 mb-8">LOG IN</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            value={user_email}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-[350px] h-10 my-1 px-6 text-sm tracking-wide border-none outline-none bg-#F5F5F5 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={user_pwd}
                            onChange={(e) => setUserPwd(e.target.value)}
                            className="w-[350px] h-10 my-1 px-6 text-sm tracking-wide border-none outline-none bg-#F5F5F5 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                        />

                        <button className="text-gray-900 text-sm mt-6 border-b border-gray-400 leading-8 bg-transparent">
                            Forgot your password?
                        </button>

                        <button
                            onClick={onSubmit}
                            className="w-[180px] h-12 bg-neutral-100 rounded-[40px] mt-12 font-bold text-sm tracking-widest ext-white shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_10px_#d1d9e6,-6px_-6px_10px_#ffffff] hover:scale-[0.985] active:shadow-[2px_2px_6px_#d1d9e6,-2px_-2px_6px_#ffffff] active:scale-[0.97] transition-all duration-300">
                            SIGN IN
                        </button>

                        {/* OR 구분선 */}
                        <div className="relative my-6 w-[350px]">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 text-gray-500 uppercase tracking-wide font-medium" style={{ backgroundColor: '#F5F5F5' }}>
                                    OR
                                </span>
                            </div>
                        </div>

                        <div className={"flex space-x-10"}>
                            <button className={"w-16 h-8 bg-neutral-100 rounded-[40px] shadow-[-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] hover:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]"}
                            onClick={handleGoogleClick}>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </button>
                            <button className={"w-16 h-8 bg-neutral-100 rounded-[40px] shadow-[-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] hover:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]"}>
                                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                            </button>
                            <button className={"w-16 h-8 bg-neutral-100 rounded-[40px] shadow-[-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] hover:shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]"}>

                            </button>
                        </div>
                    </div>
                </div>


                <div className={`absolute top-0 h-full z-[200] transition-all duration-[1250ms] bg-gray-100 overflow-hidden shadow-[4px_4px_10px_#d1d9e6,-4px_-4px_10px_#ffffff] 
                ${ isSignUp ? 'left-[50%] w-1/2' : 'left-0 w-1/2' } 
                `}>

                    {/* Background Circles */}
                    <div className={`absolute w-[400px] h-[400px] rounded-full bg-#F5F5F5 shadow-[inset_8px_8px_12px_#d1d9e6,inset_-8px_-8px_12px_#ffffff] bottom-[-30%] transition-all duration-[1250ms] ${
                        isSignUp ? 'left-[60%]' : 'left-[-60%]'
                    }`} />

                    <div className={`absolute w-[300px] h-[300px] rounded-full bg-#F5F5F5 shadow-[inset_8px_8px_12px_#d1d9e6,inset_-8px_-8px_12px_#ffffff] top-[-30%] transition-all duration-[1250ms] ${
                        isSignUp ? 'left-[-60%]' : 'left-[60%]'
                    }`} />

                    <div className={`absolute inset-0 h-full flex justify-center items-center flex-col w-[400px] px-14 py-12 transition-all duration-[1250ms] ${
                        isSignUp ? 'opacity-0 invisible translate-x-[-100%]' : 'opacity-100 visible translate-x-0'
                    }`}>
                        <h2 className="text-3xl font-bold leading-[3] text-gray-900 mb-4">Welcome Back!</h2>
                        <p className="text-sm tracking-wide text-center leading-6 mb-8 whitespace">다시 돌아오신 것을 환영합니다.

                            당신의 계정으로 로그인하여,
                            이어지는 여정과 경험을 다시 시작하세요.
                        </p>
                        <button
                            onClick={handleToggle}
                            disabled={isAnimating}
                            className="w-[180px] h-12 rounded-[40px] font-bold text-sm tracking-widest bg-neutral-100 shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:scale-[0.985] active:shadow-[2px_2px_6px_#d1d9e6,-2px_-2px_6px_#ffffff] active:scale-[0.97] transition-all duration-300"
                        >
                            GO TO JOIN
                        </button>
                    </div>

                    {/* Hello Friend Content */}
                    <div className={`absolute inset-0 h-full flex justify-center items-center flex-col w-[400px] px-8 py-12 transition-all duration-[1250ms] ${
                        isSignUp ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-[100%]'
                    }`}>
                        <h2 className="text-3xl font-bold leading-[3] text-gray-900 mb-4">Hello Friend!</h2>
                        <p className="text-sm tracking-wide text-center leading-6 mb-8">익숙한 일상에 작은 균열이 생기는 순간,
                            새로운 가능성이 그 틈을 통해 들어옵니다.
                        </p>
                        <button
                            onClick={handleToggle}
                            disabled={isAnimating}
                            className="w-[180px] h-12 bg-neutral-100 rounded-[40px] mt-12 font-bold text-sm tracking-widest ext-white shadow-[inset_-3px_-4px_4px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_10px_#d1d9e6,-6px_-6px_10px_#ffffff] hover:scale-[0.985] active:shadow-[2px_2px_6px_#d1d9e6,-2px_-2px_6px_#ffffff] active:scale-[0.97] transition-all duration-300"
                        >
                            GO TO SIGN IN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    //
    // {/* 토글 버튼 */}
    //             {/*<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">*/}
    //             {/*    <button*/}
    //             {/*        onClick={toggleForm}*/}
    //             {/*        className="bg-purple-500 text-white px-6 py-2 rounded-full shadow-md switch-btn"*/}
    //             {/*    >*/}
    //             {/*        {isLogin ? "Go to Sign Up" : "Go to Sign In"}*/}
    //             {/*    </button>*/}
    //             {/*</div>*/}

    // <div style={{width:'400px', margin:'20px auto'}}>
    //     <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
    //         <li className="nav-item" role="presentation">
    //             <a className="nav-link" id="tab-login" data-mdb-pill-init href="../Member/Login" role="tab"
    //                aria-controls="pills-login" aria-selected="false">Login</a>
    //         </li>
    //         <li className="nav-item" role="presentation">
    //             <a className="nav-link active" id="tab-register" data-mdb-pill-init href="../Member/Join"
    //                role="tab"
    //                aria-controls="pills-register" aria-selected="true">Register</a>
    //         </li>
    //     </ul>
    //
    //     <div>
    //         <div className="tab-pane fade show active" id="pills-login" role="tabpanel"
    //              aria-labelledby="tab-login">
    //             <form onSubmit={onSubmit}>
    //                 <div data-mdb-input-init className="form-outline mb-4">
    //                     <input type="email"
    //                            value={MEMBER_ID}
    //                            onChange={(e) => setMEMBER_ID(e.target.value)}
    //                            placeholder={"PWD"}
    //                            id="MEMBER_ID" className="form-control"/>
    //
    //                     <label className="form-label" htmlFor="MEMBER_ID">Email or username</label>
    //                 </div>
    //
    //                 <div data-mdb-input-init className="form-outline mb-4">
    //                     <input type="password"
    //                            value={MEMBER_PWD}
    //                            onChange={(e) => setMEMBER_PWD(e.target.value)}
    //                            placeholder={"ID"}
    //                            id="MEMBER_PWD" className="form-control"/>
    //                     <label className="form-label" htmlFor="MEMBER_PWD">Password</label>
    //                 </div>
    //
    //                 <div className="row mb-4">
    //                     <div className="col-md-6 d-flex justify-content-center">
    //                         <div className="form-check mb-3 mb-md-0">
    //                             <input className="form-check-input" type="checkbox" value="" id="loginCheck"
    //                                    checked/>
    //                             <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-md-6 d-flex justify-content-center">
    //                         <a href="#!">Forgot password?</a>
    //                     </div>
    //                 </div>
    //
    //                 <button type="submit" data-mdb-button-init data-mdb-ripple-init
    //                         className="btn btn-primary btn-block mb-4">Register
    //                 </button>
    //             </form>
    //         </div>
    //     </div>
    // </div>

        // <div className="h-screen flex items-center justify-center bg-gray-200">
        //     <div className="card w-96 p-8 bg-gray-200 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
        //         <h2 className="text-[#333333] text-center font-bold">Welcome Back</h2>
        //         <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
        //
        //         <form className={"space-y-4"}>
        //             <div className="form-control">
        //                 <label className="label">
        //                     <span className="label-text text-gray-600">Email Address</span>
        //                 </label>
        //                 <input
        //                     type="email"
        //                     placeholder="Enter your email"
        //                     className="input w-full rounded-xl bg-gray-200 border-0 shadow-inner shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
        //                 />
        //
        //             <div className={"form-control"}>
        //                 <label className={"label"}>
        //                     <span className={"label-text text-gray-600"}>Password</span>
        //                 </label>
        //                 <input type={"password"} placeholder={"Enter your password"}
        //                        className="input w-full rounded-xl bg-gray-200 border-0 shadow-inner shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
        //                    />
        //             </div>
        //
        //             <div className={"form-control"}>
        //                 <a href={"http://localhost:3000/oauth2/authorization/google"}>구글</a>
        //             </div>
        //
        //             <div className={"form-control"} >
        //                 <button
        //                     type={"submit"} className={"btn w-full rounded-xl bg-gray-200 border-0 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] text-gray-700 font-semibold hover:shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] transition"}>
        //                     Submit
        //                 </button>
        //             </div>
        //         </div>
        //
        //         {/*<div className="w-[336px] h-[79px] static">*/}
        //         {/*    <div className="w-[336px] h-[50px] static">*/}
        //         {/*        <div*/}
        //         {/*            className="bg-[#f5f5f5] rounded-[18px] border-solid border-[transparent] border w-[336px] h-[50px] absolute left-8 top-[270px]"*/}
        //         {/*            style={{*/}
        //         {/*                boxShadow:*/}
        //         {/*                    "8px 8px 16px 0px rgba(0, 0, 0, 0.10),  -8px -8px 16px 0px rgba(255, 255, 255, 0.80)",*/}
        //         {/*            }}*/}
        //         {/*        ></div>*/}
        //         {/*        <img*/}
        //         {/*            className="w-5 h-5 absolute left-[331px] top-[285px] overflow-visible"*/}
        //         {/*            src="icon0.svg"*/}
        //         {/*        />*/}
        //         {/*        <div className="text-[#000000] text-left font-body-m-font-family text-body-m-font-size leading-body-m-line-height font-body-m-font-weight absolute left-[49px] top-[281px] flex items-center justify-start">*/}
        //         {/*            Enter your password{" "}*/}
        //         {/*        </div>*/}
        //         {/*    </div>*/}
        //         {/*    <div className="text-[#666666] text-left font-body-l-font-family text-body-l-font-size leading-body-l-line-height font-body-l-font-weight absolute left-8 top-[241px]">*/}
        //         {/*        Password{" "}*/}
        //         {/*    </div>*/}
        //         {/*</div>*/}
        //         </form>
        //     </div>
        // </div>

        // <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        //     <div className="w-full max-w-5xl bg-slate-100 rounded-[32px] shadow-[10px_10px_24px_rgba(207,212,222,0.5),-10px_-10px_24px_rgba(255,255,255,0.95)] flex flex-col md:flex-row p-6 md:p-12 gap-8">
        //
        //         {/* 왼쪽 카드 */}
        //         <div className="w-full md:w-1/2 bg-slate-100 rounded-3xl shadow-[10px_10px_24px_rgba(207,212,222,0.5),-10px_-10px_24px_rgba(255,255,255,0.95)] p-8 flex flex-col justify-between">
        //             <div>
        //                 <h2 className="text-2xl md:text-3xl font-semibold text-black leading-snug text-center md:text-left">
        //                     Are you not our member,<br className="hidden md:block"/> YET ?
        //                 </h2>
        //                 <p className="text-gray-500 text-sm mt-2 text-center md:text-left">Get join us right now</p>
        //
        //                 {/* Features */}
        //                 <div className="mt-12 space-y-6">
        //                     <div className="flex items-start space-x-4">
        //                         <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 shadow-[10px_10px_24px_rgba(207,212,222,0.5),-10px_-10px_24px_rgba(255,255,255,0.95)]">
        //                             <div className="w-5 h-3 bg-blue-600" />
        //                         </div>
        //                         <div>
        //                             <p className="text-base font-medium text-black">Soft aesthetics</p>
        //                             <p className="text-sm text-gray-500">Neumorphic surfaces and tactile controls.</p>
        //                         </div>
        //                     </div>
        //
        //                     <div className="flex items-start space-x-4">
        //                         <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 shadow-[10px_10px_24px_rgba(207,212,222,0.5),-10px_-10px_24px_rgba(255,255,255,0.95)]">
        //                             <div className="w-4 h-4 bg-blue-600" />
        //                         </div>
        //                         <div>
        //                             <p className="text-base font-medium text-black">Focused UX</p>
        //                             <p className="text-sm text-gray-500">Minimal distractions, maximum clarity.</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //
        //             <button className="btn w-full md:w-80 mx-auto rounded-2xl bg-slate-100 text-black font-semibold shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)]"
        //             onClick={ToJoin}>
        //                 JOIN
        //             </button>
        //         </div>
        //
        //         {/* 오른쪽 카드 */}
        //         <div className="w-full md:w-1/2 bg-slate-100 rounded-3xl shadow-[10px_10px_24px_rgba(207,212,222,0.5),-10px_-10px_24px_rgba(255,255,255,0.95)] p-8 flex flex-col space-y-6">
        //             <div className="text-center md:text-left">
        //                 <h2 className="text-2xl font-semibold text-black">Sign in</h2>
        //                 <p className="text-sm text-gray-500">Use your email and password to continue</p>
        //             </div>
        //
        //             <form onSubmit={onSubmit} className="space-y-4 flex-1">
        //                 {/* Email */}
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text text-sm font-medium text-black">Email</span>
        //                     </label>
        //                     <input
        //                         type="email"
        //                         id={"MEMBER_ID"}
        //                         placeholder="you@comma.com"
        //                         className="input w-full rounded-2xl bg-slate-100 shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] border-0 focus:outline-none"
        //                     />
        //                 </div>
        //
        //                 {/* Password */}
        //                 <div className="form-control">
        //                     <div className="flex justify-between items-center">
        //                         <label className="label">
        //                             <span className="label-text text-sm font-medium text-black">Password</span>
        //                         </label>
        //                         <a href="#" className="text-sm text-gray-500 hover:underline">Forgot?</a>
        //                     </div>
        //                     <input
        //                         type="password"
        //                         id={"MEMBER_PWD"}
        //                         placeholder="••••••••"
        //                         className="input w-full rounded-2xl bg-slate-100 shadow-[inset_6px_6px_12px_rgba(207,212,222,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] border-0 focus:outline-none"
        //                     />
        //                 </div>
        //
        //                 {/* Remember me */}
        //                 <div className="flex items-center space-x-2">
        //                     <input type="checkbox" className="checkbox checkbox-sm" />
        //                     <span className="text-sm text-gray-500">Remember me</span>
        //                 </div>
        //
        //                 {/* 로그인 버튼 */}
        //                 <button
        //                     type="submit"
        //                     className="btn w-full rounded-lg bg-slate-100 text-black font-semibold shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(207,212,222,0.5),-2px_-2px_4px_rgba(255,255,255,0.9)]"
        //                 >
        //                     Sign in
        //                 </button>
        //             </form>
        //
        //             {/* Divider */}
        //             <div className="text-center">
        //                 <span className="text-xs text-gray-500 uppercase tracking-wide">or</span>
        //             </div>
        //
        //             {/* Social login */}
        //             <div className="flex justify-between">
        //                 <button className="btn w-24 h-11 rounded-2xl bg-slate-100 shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)]">G</button>
        //                 <button className="btn w-24 h-11 rounded-2xl bg-slate-100 shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)]">F</button>
        //                 <button className="btn w-24 h-11 rounded-2xl bg-slate-100 shadow-[6px_6px_12px_rgba(207,212,222,0.5),-6px_-6px_12px_rgba(255,255,255,0.9)]">A</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}