import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);   // { memberId, memberNo } or null
    const [loading, setLoading] = useState(true);

    // 앱 시작/새로고침 시 세션 확인
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await api.get("/GetMemberSession");   // 세션 있으면 200
                console.log("로그인 확인");
                if (mounted) setUser(res.data);
            } catch {
                if (mounted) setUser(null);         // 401 등 → 비로그인
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // 로그인
    async function login(memberId, memberPwd) {
        const res = await api.post("/login", { memberId, memberPwd });
        console.log("Authenticator: 로그인 성공");
        // 서버가 { status:"OK", memberId, memberNo } 형태로 준다고 가정
        setUser(res.data);
        return res.data;
    }

    // 로그아웃
    async function logout() {
        await api.post("/logout");
        console.log("1");

        console.log("Authenticator: 로그아웃 성공");
        setUser(null);
        // if(res.data.status == "OK"){
        //
        //
        // }else{
        //     console.log("Authenticator: 로그아웃 실패");
        // }
    }

    const value = { user, loading, login, logout, isAuthed: !!user };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
