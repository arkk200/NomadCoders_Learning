import { auth } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        signOut(auth); // signOut을 호출하면 sign out 된다.
        navigate('/'); // 홈으로 이동한다.
    };
    return (
        <button onClick={onLogOutClick}>Log Out</button>
    )
};