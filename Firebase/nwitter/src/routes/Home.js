import { useEffect, useState } from "react";
import { db } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [nweet, setNweet] = useState('');
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
    const onSubmit = async (e) => {
        e.preventDefault();
        // getFirestore로 가져온 db를 
        // firebase/firestore에 collection에 컬렉션명과 함께 넣고
        // addDoc에 doc을 넣을 컬렉션과 뒤에 데이터를 넣으면 firestore에 저장된다.
        await addDoc(collection(db, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet("")
    }
    const onChange = e => {
        const { target: { value } } = e;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                </div>)}
            </div>
        </div>
    )
};

export default Home;