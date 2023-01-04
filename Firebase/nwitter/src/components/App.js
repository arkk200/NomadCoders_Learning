import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from 'fbase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth'

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        // onAuthStateChanged를 쓰면 처음에 
        // auth.currentUser가 null에서 user데이터로 바뀔 때 감지해서 콜백함수를 실행할 수 있다.
        onAuthStateChanged(auth, user => {
            if(user) {
                // user가 존재한다면 로그인된 것이므로 isLoggedIn state 필요없음
                setUserObj({ // 성능을 위해 일부분만 가져온다.
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => updateProfile(user, { displayName: user.displayName })
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
        })
    }, []);
    // 닉네임을 바꾸는 등의 일이 일어났을 때 user를 업데이트하는 함수
    const refreshUser = () => {
        const user = auth.currentUser;
        setUserObj({ // 더 작은형태의 object로 가져와서 react가 닉네임 변경을 인식하게 함 -> Update Profile을 누르면 새로고침 없이 닉네임이 바뀜
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => updateProfile(user, { displayName: user.displayName })
        });
    }
    return (
        <>
            {init ? <AppRouter
                refreshUser={refreshUser}
                isLoggedIn={Boolean(userObj)}
                userObj={userObj}
            /> : 'Initiallizing...'}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
