import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { HotelRoutes } from "../modules/hotel/routes/HotelRoutes";

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "process") {
    return <h1>Cargando ...</h1>;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<HotelRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* <Route path="/home" element={<Home />} /> */}
      {/* <Route path="*" element={<Navigate to="/auth/login" />} /> */}
    </Routes>
  );
};
