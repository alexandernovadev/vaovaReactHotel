import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { HotelRoutes } from "../modules/hotel/routes/HotelRoutes";
import { LoadingPages } from "../UI/LoadingPages";
export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "process") {
    return <LoadingPages />;
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
