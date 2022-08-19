import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailHotel } from "../components/DetailHotel";
import { useGetHotelById } from "../hooks/useGetHotelById";
import HotelLayout from "../layout/HotelLayout";

export const ShowHotel = () => {
  const { active: hotel } = useSelector((state) => state.hotel);

  const [isLoad, setIsLoad] = useState(true);
  const { id } = useParams();
  const { getHotelByID } = useGetHotelById();

  useEffect(() => {
    const getData = async () => {
      await getHotelByID(id);
      setIsLoad(false);
    };
    getData();
  }, []);

  return (
    <HotelLayout title="Show Hotel">
      <>{isLoad ? "cargando" : <DetailHotel hotel={hotel} id={id} />}</>
    </HotelLayout>
  );
};
