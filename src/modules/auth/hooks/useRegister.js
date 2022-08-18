import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { registerUserWithEmailPassword } from "../../../firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/AuthSlice";

export const useRegister = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const register = async ({ email, password, displayName }) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    let msg = result.errorMessage.includes(
      "Firebase: Error (auth/email-already-in-use)"
    )
      ? t("AUTH.EMAIL_IN_USE")
      : t("COMMON.ERROR_SERVER");

    if (!result.ok) return dispatch(logout(msg));

    dispatch(login(result));
  };

  return {
    register,
  };
};
