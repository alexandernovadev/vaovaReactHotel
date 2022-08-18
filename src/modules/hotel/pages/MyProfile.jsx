import React from "react";
import { useSelector } from "react-redux";
import HotelLayout from "../layout/HotelLayout";

export const MyProfile = () => {
  const { displayName, email, photoURL, uid } = useSelector(
    (state) => state.auth
  );

  return (
    <HotelLayout title="My Perfil">
      <h1>{displayName}</h1>
      <img src={photoURL} alt={displayName} />
      <p>{email}</p>
      <p>{uid}</p>
    </HotelLayout>
  );
};
