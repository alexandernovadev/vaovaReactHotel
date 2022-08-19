import styled from "@emotion/styled";
import { voavaTheme } from "../../../../theme";


const mainColor = voavaTheme.palette.primary.main;
const red = voavaTheme.palette.error.main;

export const DetailSection = styled.div`
  padding-bottom: 64px;

  .titlegalleery {
    padding-top: 24px;
    padding-bottom: 24px;
    h2 {
      padding-left: 8px;
      border-left: 5px solid ${mainColor};
    }
  }
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

  @media screen and (max-width: 770px) {
    .header{
      flex-direction: column;
      text-align: center;
    }
    p{
      text-align: left;
    }
 
  }
`;

export const ModalBox = styled.div`
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
    transition: 0.2s;

    &:hover {
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