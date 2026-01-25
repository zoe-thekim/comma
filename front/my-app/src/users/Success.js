import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        alert("성공 🎉 홈으로 이동합니다.");
        navigate("/");
    }, [navigate]);
    return null;
}