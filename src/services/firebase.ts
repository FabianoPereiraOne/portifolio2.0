import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_VERCEL_API_KEY,
  authDomain: process.env.REACT_APP_VERCEL_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_VERCEL_PROJECT_ID,
  storageBucket: process.env.REACT_APP_VERCEL_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_VERCEL_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_VERCEL_APP_ID
}

export const app = () => initializeApp(firebaseConfig)
