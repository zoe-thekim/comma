import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {api} from "../api";
import {useAuth} from "../Auth/Authenticator";

function Home() {
    // const [user, setUser] = useState(null); // 로그인 유저 상태
    // const[loading, setLoading] = useState(true);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     console.log("로그인 후 홈 1");
    //     const res = await api.get("/GetMemberSession");
    // async function fetchMe(){
    //     try{
    //         const res = await api.get("/GetMemberSession");
    //         setUser(res.data);
    //     }catch(err){
    //         console.error("세션 없음", err);
    //         navigate("/member/login");
    //     }finally {
    //         setLoading(false);
    //     }
    // }
    // fetchMe();
    //     api.get("/api/GetMemberSession")
    //         .then(r=>setUser((r.data)))
    //             .catch(() => navigate("/member/login"))
    // }, []);
    // }, []);

    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    return(
        <div className={"pb-20 bg-neutral-100"}>
            {/* HERO SECTION */}
            <section className={"grid gap-10 py-12 m-8 md:grid-cols-2 md:items-center"}>
                <div className={"order-2 md:order-1"}>
                    <h1 className={"text-4xl font-extrabold tracking-tight sm:text-5xl"}>
                        Building Something Extraordinary
                    </h1>
                </div>
                <div className="order-1 md:order-2">
                    <div className={"rounded-3xl p-8 bg-gray-100 m-5 shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] rounded-3xl"}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <div className="h-10 rounded-2xl bg-background shadow-neo" />
                                <div className="h-10 rounded-2xl bg-background shadow-neo" />
                                <div className="h-12 rounded-2xl bg-background shadow-neo" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-12 rounded-2xl bg-background shadow-neo" />
                                <div className="h-12 rounded-2xl bg-background shadow-neo" />
                                <div className="h-12 rounded-2xl bg-background shadow-neo" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"mt-8 grid gap-6 md:grid-cols-2"}>
                <div className={"flex items-start gap-4"}>

                </div>
            </section>
        </div>
    )
}

export default Home;