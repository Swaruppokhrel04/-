import { getMessagingInstance, db } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const requestNotificationPermission = async (userId: string) => {
  const messaging = await getMessagingInstance();
  if (!messaging) return;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        // VAPID key is required for Web Push. 
        // For this environment, we'll try to get it if possible, 
        // but often users need to provide it from their Firebase Console.
        // vapidKey: 'YOUR_VAPID_PUBLIC_KEY'
      });

      if (token) {
        console.log('FCM Token:', token);
        // Store the token in Firestore for the user
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          fcmTokens: arrayUnion(token)
        });
        return token;
      }
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
  }
};

export const onMessageListener = async () => {
  const messaging = await getMessagingInstance();
  if (!messaging) return;

  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      resolve(payload);
    });
  });
};
