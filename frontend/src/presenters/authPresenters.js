import { authModules } from "../modules/authModules.js";
import { MESSAGES } from "../utils/messages/index.js";
import { HOME, DASHBOARD, SIGNIN } from "../utils/route.js";
import toast from "../utils/Toast.jsx";

export const signup = async (formData, { navigate }) => {
  try {
    if (formData.password !== formData.confirmPassword) {
      return toast.error(MESSAGES.PASSWORD_NOTMATCH);
    }

    await authModules.signUp(formData);
    toast.success(MESSAGES.ACCOUNT_CREATED);
    toast.success(MESSAGES.SIGNIN_PLEASE);
    navigate(SIGNIN);

    return { success: true };
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
    return { success: false };
  }
};

export const signin = async (formData, { setAuthData, navigate }) => {
  try {
    const { data } = await authModules.signIn(formData);
    setAuthData(data.result);
    toast.success(MESSAGES.LOGIN_SUCCESSFUL);
    navigate(DASHBOARD);
    return { success: true };
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
    return { success: false };
  }
};

export const logout = async ({ setAuthData, navigate }) => {
  try {
    await authModules.logout();
    setAuthData(null);
    toast.success(MESSAGES.LOGIN_SUCCESS);
    navigate(HOME);
    return { success: true };
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
    return { success: false };
  }
};
