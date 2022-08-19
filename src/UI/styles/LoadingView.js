import styled from "@emotion/styled";
import { voavaTheme } from "../../theme/voavaTheme";

const mainColor = voavaTheme.palette.primary.main;

export const LoadingViewContent = styled.div`
  width: 100%;
  height: 100%;
  top: 100%;
  position: relative;
  text-align: center;

  img{
    background-color: black;
    padding: 12px;
    border-top-left-radius: 24px; 
    border-bottom-right-radius: 24px; 
  }
`;
