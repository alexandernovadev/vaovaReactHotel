import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { SidebarDrawer } from "../components/SidebarDrawer";
import { DrawerHeader } from "../utils/configDrawer";

const HotelLayout = ({ children, title }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn">
      <CssBaseline />
      <SidebarDrawer title={title} />

      <Box
        component="main"
        sx={{
          display: "flex",
          mt: 6,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            mt: 4,
            width: {
              xm: "100%",
              sm: "100%",
              md: 720,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default HotelLayout;
