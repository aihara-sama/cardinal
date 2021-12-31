import { User } from '@firebase/auth';
import { auth, signInWithGoogle } from '../../utils/firebase.utils';

export const LoginWithGoogle = ({ user }: { user: User | null }) => {
  return (
    <div>
      {user ? (
        <button onClick={() => auth.signOut()}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Google Login</button>
      )}
      ;
    </div>
  );
};
