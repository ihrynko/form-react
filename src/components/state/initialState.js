import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../utils/validation";

const initialState = {
  fields: {
    name: {
      title: "Name",
      type: "name",
      name: "name",
      value: "",
      error: false,
      placeholder: "Input your name..",
      validator: validateName,
    },
    email: {
      title: "Email",
      type: "email",
      name: "email",
      value: "",
      error: false,
      placeholder: "Input your email..",
      validator: validateEmail,
    },
    password: {
      title: "Password",
      type: "password",
      name: "password",
      autoComplete: "false",
      value: "",
      error: false,
      placeholder: "Input your password..",
      validator: validatePassword,
    },
    passwordConfirm: {
      title: "Password confirm",
      type: "password",
      name: "passwordConfirm",
      autoComplete: "false",
      value: "",
      error: false,
      placeholder: "Confirm your password..",
      validator: validatePasswordConfirm,
    },
  },
  isError: null,
};

export default initialState;
