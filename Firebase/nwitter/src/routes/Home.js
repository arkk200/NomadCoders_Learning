import { useEffect, useState } from "react";
import { db } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
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
    const onFileChange = e => {
        const theFile = e.target.files[0]; // <input type="file" />에서 이미지 파일 정보를 가져오고
        console.log(theFile);
        const reader = new FileReader();
        // FileReader의 .readAsDataURL로 정보를 읽고 로드가 됐다면
        // 로드가 되어 나온 이벤트 정보를 출력한다.
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        }
        reader.readAsDataURL(theFile);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={nweet}
                    onChange={onChange}
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
            </form>
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