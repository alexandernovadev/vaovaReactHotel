import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingViews } from "../../../UI/LoadingViews";
import { MyHotelCard } from "../components/MyHotelCard";
import { useGetMyHotels } from "../hooks/useGetMyHotels";
import HotelLayout from "../layout/HotelLayout";
import { NoDataHotels } from "../components/NoDataHotels";


export const MyHotels = () => {
  const { getMyHotels } = useGetMyHotels();
  const { hotels, isLoadingData } = useSelector((state) => state.hotel);

  useEffect(() => {
    const data = async () => {
      await getMyHotels();
    };
    data();
  }, []);

  return (
    <HotelLayout title="My Hotels">
      {isLoadingData ? (
        <LoadingViews />
      ) : (
        <>
          {hotels.length === 0 && <NoDataHotels />}

          {!isLoadingData &&
            hotels.map((hotel) => <MyHotelCard key={hotel.id} {...hotel} />)}
        </>
      )}
    </HotelLayout>
  );
};
