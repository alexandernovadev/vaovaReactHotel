
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { checkingCredentialsFirebase, login, logout } from "../store/auth/AuthSlice";


export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkingCredentialsFirebase())

    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(""));

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));

    });
  }, []);

  return status;
};
