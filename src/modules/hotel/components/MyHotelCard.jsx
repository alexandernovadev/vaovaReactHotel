import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { voavaTheme } from "../../../theme";
import { Rating } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import styled from "@emotion/styled";

const mainColor = voavaTheme.palette.primary.main;

const CardMyHotel = styled.div`
  display: flex;
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${mainColor};
  &:hover {
    box-shadow: 0 2px 4px 0 rgba(26, 158, 138, 0.2);
  }

  a {
    border: none;
    padding: 8px 16px;
    border-radius: 12px;
    margin: 8px;
    color: white;
    cursor: pointer;
    transition: 0.1s width;
    font-size: 1.05rem;

    &:hover {
      transform: scale(1.05);
    }
  }

  .btn-edit {
    background: ${mainColor};
  }
  .btn-show {
    background: black;
  }

  .img {
    width: 45%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .details {
    width: 55%;
    padding: 8px 24px;

    .details--desc {
      height: 120px;
      overflow: auto;
      border-radius: 12px;
      padding: 5px;
    }
    .details--places {
      display: flex;
      justify-content: space-between;
      padding-top: 24px;
      border-bottom: 3px solid gray;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .details--rooms {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .details--rating {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .details--btns {
      justify-content: center;
      display: flex;
      margin: 4px;
    }
  }
`;

export const MyHotelCard = ({
  name,
  id,
  images,
  description,
  municipality,
  department,
  country,
  score,
  single_room,
  two_twin_bedroom,
  one_queen_bedroom,
}) => {
  const { t } = useTranslation();

  return (
    <CardMyHotel>
      <section className="img">
        <img src={images[0]} alt="" />
      </section>

      <section className="details">
        <h1>{name}</h1>
        <div className="details--desc">
          <p>{description}</p>
        </div>
        <div className="details--places">
          <div>
            <PublicIcon />
            {country}
          </div>
          <div>
            <AccountTreeIcon />
            {department}
          </div>
          <div>
            <FlagCircleIcon />
            {municipality}
          </div>
        </div>

        <div className="details--rooms">
          <span>
            <b>{t("HOTEL.TWO_TWIN_BEDROOM")}</b> : {two_twin_bedroom || 0}
          </span>{" "}
          <br />
          <span>
            <b>{t("HOTEL.SIMPLE_BEDROOM")}</b> : {single_room || 0}
          </span>
          <br />
          <span>
            <b>{t("HOTEL.ONE_QUEEN_BEDROOM")}</b> : {one_queen_bedroom || 0}
          </span>
        </div>

        <div className="details--rating">
          <Rating name="read-only" value={+score} readOnly />
        </div>

        <div className="details--btns">
          <Link className="btn-show" to={`/show/${id}`}>
            Ver Mas
          </Link>
          <Link className="btn-edit" to={`/edit/${id}`}>
            Editar
          </Link>
        </div>
      </section>
    </CardMyHotel>
  );
};
