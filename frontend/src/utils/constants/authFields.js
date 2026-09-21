import { buttonVariants } from "../../utils/schema";
import { SIGNUP, SIGNIN } from "../route";
export const authFields = {
  signInFields: [
    {
      type: "email",
      name: "email",
      placeholder: "Enter Email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Password",
      required: true,
    },
  ],

  signInButtons: [
    {
      type: "submit",
      varint: buttonVariants.PRIMARY,
      label: "Sign In",
    },
  ],

  signInFooter: (navigate) => ({
    message: " Don’t have an account?",
    onClick: () => navigate(SIGNUP),
    spanText: "Sign Up",
  }),

  signupFields: [
    {
      type: "text",
      name: "firstName",
      placeholder: "Enter First Name",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      placeholder: "Enter Last Name",
      required: true,
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter Email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Password",
      required: true,
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "Enter Confirm Password",
      required: true,
    },
  ],

  signUpButtons: [
    {
      type: "submit",
      varint: "primary",
      label: "Sign Up",
    },
  ],

  signUpFooter: (navigate) => ({
    message: "Already have an account?",
    onClick: () => navigate(SIGNIN),
    spanText: "Sign In",
  }),
};
