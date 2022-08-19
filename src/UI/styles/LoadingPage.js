import styled from "@emotion/styled";
import { voavaTheme } from "../../theme/voavaTheme";

const mainColor = voavaTheme.palette.primary.main;

export const LoadingPageContent = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  color: white;
  background-color: black;
  justify-content: center;
  align-items: center;

  div {
    width: 250px;
    height: 250px;
    border: 2px solid ${mainColor};
    padding: 64px;
    display: flex;
    border-radius: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: ${mainColor};
    }
  }

`;
