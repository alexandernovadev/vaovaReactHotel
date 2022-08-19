import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import PublicIcon from "@mui/icons-material/Public";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { voavaTheme } from "../../../theme";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const mainColor = voavaTheme.palette.primary.main;
const red = voavaTheme.palette.error.main;

const DetailSection = styled.div`
  padding-bottom: 64px;

  .btn-back{
    color:black;
  }

  .header {
    display: flex;
    justify-content: center;

    section {
      padding: 12px;

      img {
        border-radius: 12px;
        width: 200px;
        margin-bottom: 16px;
      }
    }
  }

  .img-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    img {
      width: 300px;
    }
  }
  .details--places {
    display: flex;
    margin-top: 24px;
    margin-bottom: 24px;
    justify-content: space-around;

    div {
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
  .buttons {
    button {
      outline: none;
      border: none;
      background: none;
      padding: 8px;
      border-radius: 8px;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
    }

    .buttons--remove {
      margin-right: 20px;
      background-color: ${red};
      color: white;
    }

    .buttons--edit {
      margin-right: 20px;
      background-color: ${mainColor};
      color: white;
    }
  }
`;

export const DetailHotel = ({ hotel, id }) => {
  console.log(hotel);

  const { t } = useTranslation();

  return (
    <DetailSection>
      <Link className="btn-back" to="/my-hotels">
        <ArrowBackIcon />
      </Link>

      <div className="header">
        <section>
          <img src={hotel.logo} alt="" />
          <span>
            <b>{t("HOTEL.TWO_TWIN_BEDROOM")}</b> : {hotel.two_twin_bedroom || 0}
          </span>{" "}
          <br />
          <span>
            <b>{t("HOTEL.SIMPLE_BEDROOM")}</b> : {hotel.single_room || 0}
          </span>
          <br />
          <span>
            <b>{t("HOTEL.ONE_QUEEN_BEDROOM")}</b> :{" "}
            {hotel.one_queen_bedroom || 0}
          </span>
        </section>

        <section className="buttons">
          <button className="buttons--remove">Eliminar</button>
          <button className="buttons--edit">Edit</button>
          <h1>{hotel.name}</h1>
          <p>{hotel.description}</p>
        </section>
      </div>
      <div className="details--places">
        <div>
          <PublicIcon />
          {hotel.country}
        </div>
        <div>
          <AccountTreeIcon />
          {hotel.department}
        </div>
        <div>
          <FlagCircleIcon />
          {hotel.municipality}
        </div>
      </div>

      <div className="img-gallery">
        {hotel.images.map((image) => (
          <img key={image} src={image} alt="" />
        ))}
      </div>
    </DetailSection>
  );
};
