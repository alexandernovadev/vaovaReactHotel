import { logoutFirebase } from "../../../firebase/providers";
import { checkingCredentials, logout } from "../../../store/auth/AuthSlice";
import { useDispatch } from "react-redux";


export const useLogOut = () => {
  const dispatch = useDispatch();

  const logOutFire = async () => {
    dispatch(checkingCredentials());

    await logoutFirebase();
    await localStorage.clear();

    dispatch(logout(""));
  };

  return {
    logOutFire,
  };
};
