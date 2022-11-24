import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth'

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        // onAuthStateChanged를 쓰면 처음에 
        // auth.currentUser가 null에서 user데이터로 바뀔 때 감지해서 콜백함수를 실행할 수 있다.
        onAuthStateChanged(auth, user => {
            if(user) {
                setIsLoggedIn(true); // user가 존재한다면 Home 페이지 보여줌
                setUserObj(user);
            } else {
                setIsLoggedIn(false); // 그렇지 않다면 Auth 페이지 보여줌
            }
            setInit(true);
        })
    }, []);
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initiallizing...'}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
