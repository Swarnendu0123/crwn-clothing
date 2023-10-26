import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
const defaultFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields; //de-structuring

  const { setCurrentUser } = useContext(UserContext);
  console.log(formFields);

  //function to reset the form
  const resetFormField = () => {
    setFormFields(defaultFields);
  };
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);
      resetFormField();
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        alert("Invalid Email or password. Please try again.");
      }
      console.log("Error : ", error);
    }
  };

  const handelChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form action="" onSubmit={handelSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handelChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Pasword"
          type="password"
          required
          onChange={handelChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button
            children="Sign In"
            type="submit"
            required
            onClick={handelChange}
          />
          <Button
            children="Sign up with Google"
            type="button"
            onClick={logGoogleUser}
            buttonType="google"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
