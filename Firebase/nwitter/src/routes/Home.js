import { useState } from "react";
import { db } from "fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState('');
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
        const {target: {value}} = e;
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
        </div>
    )
};

export default Home;