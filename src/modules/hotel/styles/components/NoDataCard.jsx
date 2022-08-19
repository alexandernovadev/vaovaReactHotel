import styled from "@emotion/styled";
import { voavaTheme } from "../../../../theme";


const mainColor = voavaTheme.palette.primary.main;
const red = voavaTheme.palette.error.main;

export const NoDataSection = styled.div`
width: 100%;
text-align: center;

img{
  width: 180px;
}

a{
  background-color: ${mainColor};
  padding: 12px;
  color:white;
  border-radius: 12px;
  text-decoration: none;

  &:hover{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  }
}

`