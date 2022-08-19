import { doc, getDoc } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../../../firebase/config";
import { setHotelActive, setLoad } from "../../../store/hotels/HotelSlice";
import { FormatToForm } from "../helpers/FormatHotelsJson";

export const useGetHotelById = () => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getHotelByID = async (ID) => {
    const docRef = await doc(FirebaseDB, `${uid}/apphotel/hotels/${ID}`);
    const hotel = await (await getDoc(docRef)).data();

    const HotelFormat = FormatToForm(hotel)
    dispatch(setHotelActive(HotelFormat));
  };

  return {
    getHotelByID,
  };
};
