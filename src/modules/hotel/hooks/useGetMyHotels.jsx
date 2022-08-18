import React from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getHotels, setLoad } from "../../../store/hotels/HotelSlice";

export const useGetMyHotels = () => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getMyHotels = async () => {
    dispatch(setLoad(true));

    const collectionRef = await collection(
      FirebaseDB,
      `${uid}/apphotel/hotels`
    );
    const docs = await getDocs(collectionRef);

    const hotels = [];
    docs.forEach((doc) => {
      hotels.push({ id: doc.id, ...doc.data() });
    });

    dispatch(getHotels(hotels));
    dispatch(setLoad(false));
  };

  return {
    getMyHotels,
  };
};
