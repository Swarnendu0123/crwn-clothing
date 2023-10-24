import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
const defaultFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { displayName, email, password, confirmPassword } = formFields; //de-structuring

  console.log(formFields);

  //function to reset the form
  const resetFormField = () => {
    setFormFields(defaultFields);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords not matching!!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField(); //reseting the form after creating object in db
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handelChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email</span>
      <form action="" onSubmit={handelSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handelChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handelChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button
          children="Sign Up"
          type="submit"
          required
          onClick={handelChange}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
