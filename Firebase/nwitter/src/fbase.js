import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // 이런식으로 Github에 내 firebase API key를 안보이게 할 수 있다.
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);

// getAuth가 반환한 객체의 .currentUser 변수는 User 또는 null을 가진다.
export const auth = getAuth();