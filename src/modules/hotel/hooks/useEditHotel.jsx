import { doc, setDoc } from "firebase/firestore/lite";
import { useSelector } from "react-redux";
import { FirebaseDB } from "../../../firebase/config";
import { FormatToSave } from "../helpers/FormatHotelsJson";

export const useEditHotel = () => {
  const { uid } = useSelector((state) => state.auth);

  const editHotel = async (ID, hotel) => {
    const newHotel = FormatToSave(hotel);

    const docRef = doc(FirebaseDB, `${uid}/apphotel/hotels/${ID}`);
    await setDoc(docRef, newHotel, { merge: true });
  };

  return {
    editHotel,
  };
};
