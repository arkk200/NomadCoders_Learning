import { async } from "@firebase/util";
import { useState } from "react";
import { auth } from "fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = e => {
        const {target: {name, value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                // 계정 생성하기
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // 로그인하기
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const toggleAccount = () => setNewAccount(prev => !prev);
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
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;