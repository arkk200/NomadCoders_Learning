import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBKPI4nSF0aqjNCISvOrwbr3qR_zZmiDZM",
    authDomain: "nwitter-e9d44.firebaseapp.com",
    projectId: "nwitter-e9d44",
    storageBucket: "nwitter-e9d44.appspot.com",
    messagingSenderId: "420567849050",
    appId: "1:420567849050:web:d032b6d76709a653e4a063"
};

const app = initializeApp(firebaseConfig);

export default app;