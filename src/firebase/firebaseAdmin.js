
import admin, { initializeApp, credential as _credential } from 'firebase-admin';
import serviceAccount from '../firebase/test-7f571-firebase-adminsdk-yrdfu-b33e30d80b.json';

initializeApp({
  credential: _credential.cert(serviceAccount),
});

// Export the initialized admin object
export  {admin};