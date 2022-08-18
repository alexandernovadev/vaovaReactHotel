import { doc, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../../../firebase/config";

export const useEditHotel = () => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const editHotel = async (ID, hotel) => {
    // Format to save to firebase
    const newHotel = {
      ...hotel,
      one_queen_bedroom: hotel.roomtypes.one_queen_bedroom.state
        ? hotel.roomtypes.one_queen_bedroom.value
        : null,
      single_room: hotel.roomtypes.single_room.state
        ? hotel.roomtypes.single_room.value
        : null,
      two_twin_bedroom: hotel.roomtypes.two_twin_bedroom.state
        ? hotel.roomtypes.two_twin_bedroom.value
        : null,
    };
    delete newHotel.roomtypes;

    // delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/apphotel/hotels/${ID}`);
    await setDoc(docRef, newHotel, { merge: true });
  };

  return {
    editHotel,
  };
};
