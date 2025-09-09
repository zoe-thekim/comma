import { useState } from "react";
import {api, apiFetch} from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join() {
    const [MEMBER_ID, setMEMBER_ID] = useState("");
    const [MEMBER_PWD, setMEMBER_PWD] = useState("");
    const navigate = useNavigate();

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            console.log("1");
            const res = await api.post("/join", {
                memberId: MEMBER_ID,
                memberPwd: MEMBER_PWD
            });
            console.log("2");
            if (res.data.status === "OK") {
                alert("회원가입 성공");
                navigate("/");
            }
        } catch (err) {
            alert("회원가입 실패");
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
                    <label htmlFor="memberPwd" style={{ display: "block", marginBottom: 6 }}>
                        Password Check
                    </label>
                    <input
                        type="password"
                        value={MEMBER_PWD}
                        onChange={(e) => setMEMBER_PWD(e.target.value)}
                        placeholder="Password Check"
                    />
                </div>


                <button class="btn" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Join;
