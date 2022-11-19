import { async } from "@firebase/util";
import { useState } from "react";
import { auth } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;