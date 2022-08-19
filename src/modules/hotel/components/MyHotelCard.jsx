import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { CardMyHotel } from "../styles/components/CardMyHotel";

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
