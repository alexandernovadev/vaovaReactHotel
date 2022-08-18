import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Box, Typography } from "@mui/material";
import { AppBar, Drawer, DrawerHeader } from "../utils/configDrawer";
import Tooltip from "@mui/material/Tooltip";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLogOut } from "../../auth/hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import { FlagTranslate } from "../../../UI/FlagTranslate";

const optionsMenu = [
  { title: "Crear Hotel", icon: <AddCircleIcon />, to: "/create" },
  { title: "Mis hoteles", icon: <BedroomParentIcon />, to: "/my-hotels" },
  { title: "Todos los Hoteles", icon: <MapsHomeWorkIcon />, to: "/" },
  { title: "Mi perfil", icon: <AccountCircleIcon />, to: "/my-profile" },
];

export const SidebarDrawer = ({ title }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { logOutFire } = useLogOut();

  const handleRoute = (route) => {
    navigate(route);
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          </Box>
          <Box>
            <FlagTranslate />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {optionsMenu.map(({ title, icon, to }, index) => (
            <ListItem key={title} disablePadding sx={{ display: "block" }}>
              <Tooltip title={open ? "" : title} placement="left-start">
                <ListItemButton
                  onClick={() => handleRoute(to)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}

          <ListItem key={title} disablePadding sx={{ display: "block" }}>
            <Tooltip title={open ? "" : "Cerrar Sesion"} placement="left-start">
              <ListItemButton
                onClick={() => logOutFire()}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Cerrar Sesion"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
