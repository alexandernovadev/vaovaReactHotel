import { useDispatch } from "react-redux";
import { fileUpload } from "../cloudinary/fileUpload";
import { setSaving } from "../store/hotels/HotelSlice";

export const useUploadClodninary = () => {
  const dispatch = useDispatch();
  const uploadImages = async (files = []) => {
    dispatch(setSaving(true));

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setSaving(false));
    return photosUrls;
  };

  return {
    uploadImages,
  };
};
