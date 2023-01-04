import { useState } from "react";
import { auth } from "fbase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import AuthForm from "components/AuthForm";

const Auth = () => {
    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider(); // 구글 계정으로 로그인
        } else if (name === "github") {
            provider = new GithubAuthProvider();// 깃허브 계정으로 로그인
        }
        // Popup으로 소셜 로그인을 지원함
        const data = await signInWithPopup(auth, provider);
        console.log(data);
    }
    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;