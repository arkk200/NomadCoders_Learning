import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth'

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        // onAuthStateChanged를 쓰면 처음에 
        // auth.currentUser가 null에서 user데이터로 바뀔 때 감지해서 콜백함수를 실행할 수 있다.
        onAuthStateChanged(auth, user => {
            if(user) {
                // user가 존재한다면 로그인된 것이므로 isLoggedIn state 필요없음
                setUserObj(user);
            }
            setInit(true);
        })
    }, []);
    return (
        <>
            {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initiallizing...'}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
