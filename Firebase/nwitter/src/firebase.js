import { initializeApp } from "firebase/app";

const firebaseConfig = {
    // 이런식으로 Github에 내 firebase API key를 안보이게 할 수 있다.
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;