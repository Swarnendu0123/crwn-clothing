import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";

import SignUpForm from "../../components/sign-up/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <SignUpForm />
      <Button children="Sign up with Google" onClick={logGoogleUser} buttonType='google'/>
    </div>
  );
};

export default SignIn;
