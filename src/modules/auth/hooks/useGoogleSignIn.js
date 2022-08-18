import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { singInWithGoogle } from "../../../firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/AuthSlice";

export const useGoogleSignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loginWithGoogle = async () => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();

    if (result.errorMessage) {
      let msg = result.errorMessage.includes(
        "Firebase: Error (auth/popup-closed-by-user)"
      )
        ? t("AUTH.POPUP_CLOSED_ERROR")
        : t("COMMON.ERROR_SERVER");

      if (!result.ok) return dispatch(logout(msg));
    }

    dispatch(login(result));
  };

  return {
    loginWithGoogle,
  };
};
