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

    if(loading) return <p>로딩중</p>;

    return(
        <div>
            <h3>Home</h3>

            <div>
                Hello
            </div>
        </div>
    )
}

export default Home;