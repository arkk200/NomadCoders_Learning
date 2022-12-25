import { db, storage } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRef, useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const [changedNweet] = useState(doc(db, "nweets", `${nweetObj.id}`));
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if (!ok) return;
        // doc() 을 firebase/firestore에서 불러온 후
        // 차례대로 getFireStore(), collection 이름, doc아이디를 넣은 후
        // 반환된 값을 deleteDoc이나 updateDoc에 넣으면 삭제되거나 수정된다.
        await deleteDoc(changedNweet);
        // Firebase storage에 데이터를 삭제하려면
        // ref라는 함수를 이용해 url을 가져오고 deleteObject로 삭제하면 된다.
        await deleteObject(ref(storage, nweetObj.attachmentUrl));
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(changedNweet, {
            text: newNweet
        });
        setEditing(false);
    }
    const onChange = e => setNewNweet(e.target.value);
    return (
        <div key={nweetObj.id}>
            {editing ? <>
                {
                    isOwner && <>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="Edit your nweet"
                                value={newNweet}
                                required
                                onChange={onChange}
                            />
                            <input type="submit" value="Done" />
                        </form>
                        <button onClick={toggleEditing}>cancel</button>
                    </>
                }
            </>
                : <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" /> }
                    { // Nweet의 주인이라면 삭제, 수정 버튼이 보이게 함
                        isOwner && <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default Nweet;