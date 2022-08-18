import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  isLoadingData: false,
  hotels: [],
  active: {}
}
export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setSaving: (state, { payload }) => {
      state.isSaving = payload
    },
    setLoad: (state, { payload }) => {
      state.isLoadingData = payload
    },
    getHotels: (state, { payload }) => {
      state.hotels = payload;
    },
    setHotelActive: (state, { payload }) => {
      state.active = payload;
    },

  },
});

export const { getHotels, setSaving, setLoad, setHotelActive } = hotelSlice.actions;
