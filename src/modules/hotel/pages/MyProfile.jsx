import React from "react";
import { useSelector } from "react-redux";
import HotelLayout from "../layout/HotelLayout";

import avatarnone from "../../../assets/avatarnone.png";
export const MyProfile = () => {
  const { displayName, email, photoURL, uid } = useSelector(
    (state) => state.auth
  );

  return (
    <HotelLayout title="My Perfil">
      <h1>{displayName || "Without Name"}</h1>
      <img
        src={photoURL || avatarnone}
        style={{
          width: 180,
          borderRadius: 12,
        }}
        alt={displayName}
      />
      <h4>{email}</h4>
      <small>{uid}</small> <br />
      <span>Section in contruction ...</span>
    </HotelLayout>
  );
};
