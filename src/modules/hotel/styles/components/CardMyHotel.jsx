import { voavaTheme } from "../../../../theme";
import styled from "@emotion/styled";

const mainColor = voavaTheme.palette.primary.main;

export const CardMyHotel = styled.div`
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

  @media screen and (max-width: 770px) {
    flex-direction: column;

    .details {
      width: 100%;
    }

    .img {
      width: 100%;

      img {
        height: 320px;
      }
    }
  }
`;
