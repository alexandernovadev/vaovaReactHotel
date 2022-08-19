import { collection,  doc, setDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../../../firebase/config";
import { setSaving } from "../../../store/hotels/HotelSlice";
import { FormatToSave } from "../helpers/FormatHotelsJson";

export const useSaveHotel = () => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const saveHotel = async (hotel) => {
    dispatch(setSaving(true));
    const newHotel = FormatToSave(hotel);
    const newDoc = doc(collection(FirebaseDB, `${uid}/apphotel/hotels`));
    await setDoc(newDoc, newHotel);

    newHotel.id = newDoc.id;
    dispatch(setSaving(false));
  };

  return {
    saveHotel,
  };
};
