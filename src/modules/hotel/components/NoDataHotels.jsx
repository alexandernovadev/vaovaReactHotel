import React from "react";
import { NoDataSection } from "../styles/components/NoDataCard";
import { Link } from "react-router-dom";
import nodata from "../../../assets/nodata.png";
import { useTranslation } from "react-i18next";

export const NoDataHotels = () => {
  const  {t}= useTranslation()

  return (
    <NoDataSection>
      <img src={nodata} alt="No data" />
      <h1>{t("HOTEL.NO_REGISTER_HOTEL")}</h1>
      <h4>{t("HOTEL.REGISTER_HOTEL")}</h4>

      <Link  to={`/save`}>
      {t("COMMON.EDIT")}
      </Link>
    </NoDataSection>
  );
};
