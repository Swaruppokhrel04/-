importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD4qg7xEReoaGAsuXhe27i6PpZiKunTbro",
  authDomain: "gen-lang-client-0455256954.firebaseapp.com",
  projectId: "gen-lang-client-0455256954",
  storageBucket: "gen-lang-client-0455256954.firebasestorage.app",
  messagingSenderId: "746537904851",
  appId: "1:746537904851:web:83cc211bcfff8444924226",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
