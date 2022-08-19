import { Route, Routes, Navigate } from "react-router-dom";
import { AllHotels } from "../pages/AllHotels";
import { CreateHotel } from "../pages/CreateHotel";
import { EditHotel } from "../pages/EditHotel";
import { MyHotels } from "../pages/MyHotels";
import { MyProfile } from "../pages/MyProfile";
import { ShowHotel } from "../pages/ShowHotel";

export const HotelRoutes = () => {
  return (
    <Routes>
      {/* <Route path="" element={<AllHotels />} /> */}
      <Route path="" element={<CreateHotel />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/create" element={<CreateHotel />} />
      <Route path="/edit/:id" element={<EditHotel />} />
      <Route path="/show/:id" element={<ShowHotel />} />
      <Route path="/my-hotels" element={<MyHotels />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
