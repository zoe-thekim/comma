import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Authenticator";

function Join() {
    const [MEMBER_ID, setMEMBER_ID] = useState("");
    const [MEMBER_PWD, setMEMBER_PWD] = useState("");
    const [MEMBER_PWD_CHECK, setMEMBER_PWD_CHECK] = useState("");
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleJoin = async (e) => {
        e.preventDefault();

        if (MEMBER_PWD !== MEMBER_PWD_CHECK) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const result = await register(MEMBER_ID, MEMBER_PWD);
            if (result.status === "OK" || result.memberId) {
                alert("회원가입 및 로그인 성공");
                navigate("/");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "회원가입 실패";
            alert(errorMessage);
            console.error("JOIN ERROR:", err?.response?.status, err?.response?.data || err.message);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
            <h2 style={{ marginBottom: 16 }}>Join </h2>

            <form onSubmit={handleJoin}>
                <label htmlFor="memberId" style={{ display: "block", marginBottom: 6 }}>
                    Email
                </label>
                <input
                    value={MEMBER_ID}
                    onChange={(e) => setMEMBER_ID(e.target.value)}
                    placeholder="Email"
                />

                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="memberPwd" style={{ display: "block", marginBottom: 6 }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={MEMBER_PWD}
                        onChange={(e) => setMEMBER_PWD(e.target.value)}
                        placeholder="Password"
                    />
                </div>


                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="memberPwdCheck" style={{ display: "block", marginBottom: 6 }}>
                        Password Check
                    </label>
                    <input
                        type="password"
                        value={MEMBER_PWD_CHECK}
                        onChange={(e) => setMEMBER_PWD_CHECK(e.target.value)}
                        placeholder="Password Check"
                    />
                </div>


                <button class="btn" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Join;
