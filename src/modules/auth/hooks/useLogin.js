import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { loginWithEmailPassword } from "../../../firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/AuthSlice";


export const useLogin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loginFire = async ({ email, password }) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });

    if (result.errorMessage) {
      let msg = result.errorMessage.includes(
        "Firebase: Error (auth/user-not-found)"
      )
        ? t("AUTH.USER_NO_EXIST")
        : result.errorMessage.includes("Firebase: Error (auth/wrong-password)")
        ? t("AUTH.EMAILORPASSWORD_ERROR")
        : t("COMMON.ERROR_SERVER");

      if (!result.ok) return dispatch(logout(msg));
    }

    dispatch(login(result));
  };

  return {
    loginFire,
  };
};
