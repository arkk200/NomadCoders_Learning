import { useEffect, useState } from "react";
import { db } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]); // db에 저장된 nweets
    
    useEffect(() => {
        const q = query(
            collection(db, "nweets"),
            orderBy("createdAt", "desc")
        );
        // onAuthStateChanged처럼 collection에 데이터가 바뀌면 실행함 (실시간으로 댓글 작성이 올라온다.)
        onSnapshot(q, snapshot => {
            const nweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArr)
        })
    }, []);
    
    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map(nweet => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid} // nweet.creatorId에 저장한 userObj.uid와 현재 로그인한 유저의 uid가 같은지 판별
                    />
                ))}
            </div>
        </div>
    )
};

export default Home;