import { useEffect, useState } from "react";
import { db } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]); // db에 저장된 nweets
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(db, "nweets")); // getDocs로 docs를 가져올 수 있음
        dbNweets.forEach(doc => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id // doc에 있는 고유 id를 각 nweet에게 줌
            }
            setNweets(prev => [nweetObj, ...prev]);
        });
    }
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        // getFirestore로 가져온 db를 
        // firebase/firestore에 collection에 컬렉션명과 함께 넣고
        // addDoc에 doc을 넣을 컬렉션과 뒤에 데이터를 넣으면 firestore에 저장된다.
        await addDoc(collection(db, "nweets"), {
            nweet,
            createAt: Date.now()
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
                    <h4>{nweet.nweet}</h4>
                </div>)}
            </div>
        </div>
    )
};

export default Home;