import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const firebaseApp = initializeApp({
  // enter your firebase project details
  apiKey: "AIzaSyBwB7b2QZMcASVAVkCs5K8FRD2zIJvP6KY",
  authDomain: "ridesmash-924b9.firebaseapp.com",
  databaseURL: "https://ridesmash-924b9-default-rtdb.firebaseio.com",
  projectId: "ridesmash-924b9",
  storageBucket: "ridesmash-924b9.appspot.com",
  messagingSenderId: "1027238332681",
  appId: "1:1027238332681:web:a19e181ba90dda13842bd8",
  measurementId: "G-9H4XS8GQTV"

});

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);