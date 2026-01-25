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
                const res = await api.get("/auth/me");   // 세션 있으면 200
                console.log("로그인 확인");
                if (mounted) setUser(res.data);
            } catch {
                console.log("세션 없음 또는 미로그인 상태");
                if (mounted) setUser(null);         // 401 등 → 비로그인
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // 로그인
    async function login(userEmail, userPwd) {
        const res = await api.post("/auth/login", { userEmail, userPwd });
        console.log("Authenticator: 로그인 성공");
        // 서버가 { status:"OK", memberId, memberNo } 형태로 준다고 가정
        setUser(res.data);
        return res.data;
    }

    // 로그아웃
    async function logout() {
        await api.post("/auth/logout");
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

    // 회원가입
    async function register(userEmail, userPwd, role = 'USER') {
        const res = await api.post("/auth/join", {
            userEmail,
            userPwd
        });

        if (res.data.status === "OK") {
            console.log("Authenticator: 회원가입 성공, 자동 로그인 시도");
            // 회원가입 성공 시 자동 로그인
            return await login(userEmail, userPwd);
        }

        console.log("Authenticator: 회원가입 실패");
        return res.data;
    }

    async function update(name, phone, address) {
        const res = await api.post("/auth/update", {
            name,
            phone,
            address
        });

        if (res.data.status === "OK") {
            console.log("Authenticator: 회원 정보 업데이트 성공");
            // 회원가입 성공 시 자동 로그인
            return await update(name, phone, address);
        }

        console.log("Authenticator: 회원 정보 업데이트 실패");
        return res.data;
    }

    // 사용자 정보 업데이트
    function updateUser(updatedUserData) {
        setUser(prev => ({ ...prev, ...updatedUserData }));
    }

    const value = { user, loading, login, logout, register, updateUser, isAuthed: !!user };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
