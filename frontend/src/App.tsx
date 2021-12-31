import { Routes, Route } from 'react-router-dom';
import { Fonts } from './Components/Fonts';
import { AddSentence } from './Pages/AddSentence/AddSentence';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import { Home } from './Pages/Home/Home';
import { Sentence } from './Pages/Sentence/Sentence';
import { LoginWithGoogle } from './Pages/LoginWithGoogle/LoginWithGoogle';
import React from 'react';
import { auth } from './utils/firebase.utils';
import { Unsubscribe } from '@firebase/util';
import { User } from '@firebase/auth';
import { firestore } from './utils/firebase.utils';
import { collection, addDoc, getDoc, getDocs, doc } from 'firebase/firestore';

class App extends React.Component<{}, { currentUser: null | User }> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth!: Unsubscribe;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      this.setState({
        currentUser: user,
      });

      // getDocs()
      console.log({ user });

      if (user) {
        const userSnapshot = await getDoc(doc(firestore, `users/${user.uid}`));
        if (!userSnapshot.exists()) {
          await addDoc(collection(firestore, `users`), {
            uid: user.uid,
            email: user.email,
            username: user.displayName,
          });
        }
        // return;
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        <Fonts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/auth/login-with-google"
            element={<LoginWithGoogle user={this.state.currentUser} />}
          />
          <Route path="/add-sentence" element={<AddSentence />} />
          <Route path="/sentences/:sentenceId" element={<Sentence />} />
        </Routes>
      </>
    );
  }
}

export default App;
