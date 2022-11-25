const Nweet = ({ nweetObj, isOwner }) => (
    <div key={nweetObj.id}>
        <h4>{nweetObj.text}</h4>
        { // Nweet의 주인이라면 삭제, 수정 버튼이 보이게 함
            isOwner && <>
                <button>Delete Nweet</button>
                <button>Edit Nweet</button>
            </>
        }
    </div>
)

export default Nweet;