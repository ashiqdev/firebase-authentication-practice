import {
  auth,
  facebookAuthProvuder,
  githubAuthProvider,
  googleAuthProvider,
} from './firebase.config';

const updateUserName = async (name) => {
  const user = auth.currentUser;
  const updatedUser = await user.updateProfile({ displayName: name });
  return updatedUser;
};

const registerUser = async ({ name, email, password }) => {
  // create user in firebase
  await auth.createUserWithEmailAndPassword(email, password);
  //   update the displayName
  const updatedUser = await updateUserName(name);
  return updatedUser;
};

const signinUser = async (email, password) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);

  return user;
};

const handleSocialSignIn = async (media) => {
  let newUser;
  switch (media) {
    case 'google':
      const { user: googleUser } = await auth.signInWithPopup(
        googleAuthProvider
      );

      newUser = {
        displayName: googleUser.displayName,
        userEmail: googleUser.email,
        photoURL: googleUser.photoURL,
      };

      break;

    case 'facebook':
      const { user: fbUser } = await auth.signInWithPopup(facebookAuthProvuder);
      newUser = {
        displayName: fbUser.displayName,
        userEmail: fbUser.email,
        photoURL: fbUser.photoURL,
      };
      break;

    case 'github':
      const { user: ghUser } = await auth.signInWithPopup(githubAuthProvider);
      newUser = {
        displayName: ghUser.displayName,
        userEmail: ghUser.email,
        photoURL: ghUser.photoURL,
      };
      break;

    default:
      return newUser;
  }

  return newUser;
};

export { registerUser, signinUser, handleSocialSignIn };
