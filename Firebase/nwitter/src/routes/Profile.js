import { async } from "@firebase/util";
import { auth, db } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        signOut(auth); // signOut을 호출하면 sign out 된다.
        navigate('/'); // 홈으로 이동한다.
    };
    const onChange = e => {
        setNewDisplayName(e.target.value);
    }
    const getMyNweets = async() => {
        const q = query( // 내가 단 nweets만 가져옴
            collection(db, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs.map(doc => doc.data()));
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(auth.currentUser, { // updateProfile로 user의 정보를 업데이트 시킬 수 있다.
                displayName: newDisplayName
            });
            refreshUser();
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    value={newDisplayName}
                    onChange={onChange}
                    type="text" 
                    placeholder="Display name" 
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};