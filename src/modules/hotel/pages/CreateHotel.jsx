import { FormHotel } from "../components/FormHotel";
import HotelLayout from "../layout/HotelLayout";
import { useTranslation } from "react-i18next";

const initialValues = {
  name: "",
  description: "",
  country: "",
  logo: "",
  department: "",
  municipality: "",
  type_hotel: "",
  score: 2,
  roomtypes: {
    two_twin_bedroom: { state: true, value: 0 },
    single_room: { state: true, value: 0 },
    one_queen_bedroom: { state: true, value: 0 },
  },
  images: [],
};

export const CreateHotel = () => {
  const { t } = useTranslation();
  return (
    <HotelLayout title={t("HOTEL.SAVE_HOTEL")}>
      <FormHotel initialValues={initialValues} />
    </HotelLayout>
  );
};
