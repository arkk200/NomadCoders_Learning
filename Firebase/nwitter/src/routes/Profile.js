import { auth, db } from "fbase";
import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({ userObj }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        signOut(auth); // signOut을 호출하면 sign out 된다.
        navigate('/'); // 홈으로 이동한다.
    };
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
    return (
        <button onClick={onLogOutClick}>Log Out</button>
    )
};