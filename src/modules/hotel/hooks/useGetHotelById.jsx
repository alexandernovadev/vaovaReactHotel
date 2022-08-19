import { doc, getDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../../../firebase/config";
import { setHotelActive, setLoad } from "../../../store/hotels/HotelSlice";

export const useGetHotelById = () => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getHotelByID = async (ID) => {
    const docRef = await doc(FirebaseDB, `${uid}/apphotel/hotels/${ID}`);
    const hotel = await (await getDoc(docRef)).data();

    const two_twin_bedroom = hotel.two_twin_bedroom
      ? { state: true, value: hotel?.two_twin_bedroom }
      : { state: false, value: 0 };

    const one_queen_bedroom = hotel.one_queen_bedroom
      ? { state: true, value: hotel?.one_queen_bedroom }
      : { state: false, value: 0 };

    const single_room = hotel.single_room
      ? { state: true, value: hotel?.single_room }
      : { state: false, value: 0 };

    const HotelFormat = {
      ...hotel,
      roomtypes: {
        two_twin_bedroom,
        one_queen_bedroom,
        single_room,
      },
    };

    delete HotelFormat.two_twin_bedroom;
    delete HotelFormat.one_queen_bedroom;
    delete HotelFormat.single_room;

    dispatch(setHotelActive(HotelFormat));
  };

  return {
    getHotelByID,
  };
};
