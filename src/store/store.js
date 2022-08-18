import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/AuthSlice";
import { hotelSlice } from "./hotels/HotelSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hotel: hotelSlice.reducer,
  },
});
