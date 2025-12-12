import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { isFirebaseConfigured } from './env'

let dbInstance: ReturnType<typeof getDatabase> | null = null
if (isFirebaseConfigured()) {
  const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  })
  dbInstance = getDatabase(app)
}

export const db = dbInstance
