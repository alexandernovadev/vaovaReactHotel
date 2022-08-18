import React from "react";
import { useTranslate } from "../hooks/useTranslate";
import { styled } from "@mui/material/styles";

export const Button = styled("button")(({ theme }) => ({
  border: "none",
  fontSize: "1.2em",
  cursor: "pointer",
  background: "transparent",
  padding: theme.spacing(0, 1),
}));

export const FlagTranslate = () => {
  const { setTranslate, getLocale } = useTranslate();

  return (
    <>
      <Button
        onClick={() => setTranslate("en")}
        style={{ fontWeight: getLocale() == "en" ? "bold" : "" }}
      >
        en
      </Button>
      <b>|</b>

      <Button
        style={{ fontWeight: getLocale() == "es" ? "bold" : "" }}
        onClick={() => setTranslate("es")}
      >
        es
      </Button>
    </>
  );
};
