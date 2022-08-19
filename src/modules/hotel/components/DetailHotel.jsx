import { useState } from "react";
import { useTranslation } from "react-i18next";
import PublicIcon from "@mui/icons-material/Public";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDeleteHotel } from "../hooks/useDeleteHotel";

import PropTypes from 'prop-types'
import { DetailSection, ModalBox } from "../styles/components/DetailHotelStyle";

export const DetailHotel = ({ hotel, id }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { deleteHotel } = useDeleteHotel();
  const navigate = useNavigate();

  const handleDelele = async () => {
    // ToDO Delete image from cloudinary
    try {
      await deleteHotel(id);
      navigate("/my-hotels");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoEdit = () => {
    navigate("/edit/"+id);
  }

  return (
    <DetailSection>
      <Link className="btn-back" to="/my-hotels">
        <ArrowBackIcon />
      </Link>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="remove-hotel"
        aria-describedby="modal-remove-hotel"
      >
        <ModalBox className="animate__animated animate__pulse animate__faster">
          <div>
            <h2 id="modal-title">¿ Esta seguro de Eliminar ?</h2>
            <p id="modal-description">{hotel.name}</p>
            <button className="buttons--remove" onClick={handleDelele}>
              Eliminar
            </button>
            <button className="buttons--cancel" onClick={() => setOpen(false)}>
              Cancerlar
            </button>
          </div>
        </ModalBox>
      </Modal>

      <div className="header">
        <section>
          <img src={hotel.logo} alt="" />
          <div>

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
          </div>
        </section>

        <section className="buttons">
          <button className="buttons--remove" onClick={() => setOpen(true)}>
            Eliminar
          </button>
          <button className="buttons--edit" onClick={handleGoEdit}>Edit</button>
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

      <div className="titlegalleery">
        <h2>Galeria de Fotos</h2>
      </div>
      <div className="img-gallery">
        {hotel.images.map((image) => (
          <img key={image} src={image} alt="" />
        ))}
      </div>
    </DetailSection>
  );
};

DetailHotel.propTypes = {
  hotel: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}
