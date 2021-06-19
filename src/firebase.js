import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyBBGNhKjKuFpDXoHW5P103QrDTf2Naeh74",
    authDomain: "space-chat-404.firebaseapp.com",
    projectId: "space-chat-404",
    storageBucket: "space-chat-404.appspot.com",
    messagingSenderId: "1046255795382",
    appId: "1:1046255795382:web:db2616d2fafd48ebef3a17",
    measurementId: "G-05K3SZ5M3L",
  })
  .auth();
