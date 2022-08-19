import { FirebaseDB } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore/lite";

export const useDeleteHotel = () => {
  const { uid } = useSelector((state) => state.auth);

  const deleteHotel = async (ID) => {
    const docRef = doc(FirebaseDB, `${uid}/apphotel/hotels/${ID}`);
    await deleteDoc(docRef);
  };

  return {
    deleteHotel,
  };
};
