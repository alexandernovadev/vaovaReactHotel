import React from "react";
import { LoadingPageContent } from "./styles/LoadingPage";
import { useTranslation } from "react-i18next";

import logo from "../assets/logo-vaova-white-1.png";

export const LoadingPages = () => {
  const { t } = useTranslation();

  return (
    <LoadingPageContent className="animate__animated animate__fadeIn">
      <div className="animate__animated animate__bounce animate__infinite	">
        <img src={logo} alt="Logo vaova" />
        <h1>{t("COMMON.LOADING")}</h1>
      </div>
    </LoadingPageContent>
  );
};
