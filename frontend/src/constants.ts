export const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// Errors
export const USERNAME_REQUIRED = 'Username is required';
export const EMAIL_REQUIRED = 'Email is required';
export const EMAIL_INVALID =
  'Email pattern is incorrect. Example: john-doe@example.com';
export const PASSWORD_REQUIRED = 'Password is required';
export const PASSWORD_TOO_SHORT = 'Password too short';
export const firebaseConfig = {
  apiKey: 'AIzaSyAXPEr9OUMVttCdhrPJRFRiAUY6CV1fDuo',
  authDomain: 'sentences-3406a.firebaseapp.com',
  databaseURL: 'https://sentences-3406a-default-rtdb.firebaseio.com',
  projectId: 'sentences-3406a',
  storageBucket: 'sentences-3406a.appspot.com',
  messagingSenderId: '394776494553',
  appId: '1:394776494553:web:53ff73313d7c8b4eebd9c8',
  measurementId: 'G-CB1WWFHH95',
};
