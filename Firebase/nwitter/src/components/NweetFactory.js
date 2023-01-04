import { db, storage } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState(""); // attachment에 사진 정보를 담음
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") { // 만약 attachment가 비어있지 않다면 attachmentUrl에 사진 url 대입
            const attachmentRef = ref(storage, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        // getFirestore로 가져온 db를
        // firebase/firestore에 collection에 컬렉션명과 함께 넣고
        // addDoc에 doc을 넣을 컬렉션과 뒤에 데이터를 넣으면 firestore에 저장된다.
        await addDoc(collection(db, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");
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
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    // 클릭을 하면 사진 없앰
    const onClearAttachmentClick = () => setAttachment(null);
    return (
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
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachmentClick}>Cancel upload</button>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;