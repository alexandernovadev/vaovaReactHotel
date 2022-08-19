import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import PublicIcon from "@mui/icons-material/Public";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { voavaTheme } from "../../../theme";

import { Link,useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDeleteHotel } from "../hooks/useDeleteHotel";

const mainColor = voavaTheme.palette.primary.main;
const red = voavaTheme.palette.error.main;

const DetailSection = styled.div`
  padding-bottom: 64px;

  .btn-back {
    color: black;
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

const ModalBox = styled.div`
  position: absolute;
  top: 20%;
  left: 40%;
  transform: translate(-50%; -50%);
  width: 400;
  background-color: white;
  border-radius: 12px;
  boxshadow: 24;
  padding: 12px;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  button {
    margin-top: 12px;
    border: none;
    background: none;
    padding: 8px;
    border-radius: 12px;
    transition: .2s;

    &:hover{
      transform: scale(1.02);
    }
  }
  .buttons--remove {
    border: 1px solid ${red};
  }
  .buttons--cancel {
    border: 1px solid black;
  }
`;

export const DetailHotel = ({ hotel, id }) => {
  
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { deleteHotel } = useDeleteHotel();
  const navigate = useNavigate();

  const handleDelele = async()=> {
    try {
      await deleteHotel(id)
      
      navigate("/my-hotels");
    } catch (error) {
      console.log(error);
    }
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
          <div >
            <h2 id="modal-title">¿ Esta seguro de Eliminar ?</h2>
            <p id="modal-description">{hotel.name}</p>
            <button className="buttons--remove" onClick={handleDelele}>Eliminar</button>
            <button className="buttons--cancel" onClick={() => setOpen(false)}>
              Cancerlar
            </button>
          </div>
        </ModalBox>
      </Modal>

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
          <button className="buttons--remove" onClick={() => setOpen(true)}>
            Eliminar
          </button>
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
