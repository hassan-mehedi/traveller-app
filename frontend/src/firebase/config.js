import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDF8QGfi6tVp_nLHzdBSMOTmsh2wlBCPlw",
    authDomain: "traveler-storage.firebaseapp.com",
    projectId: "traveler-storage",
    storageBucket: "traveler-storage.appspot.com",
    messagingSenderId: "165949881544",
    appId: "1:165949881544:web:bc02d24f090ff3478639fd",
    measurementId: "G-YQJMYZGQPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export default storage;
