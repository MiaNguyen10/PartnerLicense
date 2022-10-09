import { Box, IconButton, Toolbar, Typography, Button } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Logo/Logo.png";
import { styled } from "@mui/material/styles";
import useLanguage from "../../services/language";
import useWindowDimensions from "../../services/windowDimensions";

const drawerWidth = 256;

const ButtonLan = styled(Button)({
  margin: "0",
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface LayoutProps {
  disableMenu?: boolean;
  handleDrawer?: any;
}

const Header: React.FC<LayoutProps> = (disableMenu) => {
  const auth = useAuth();
  const { i18n} = useTranslation();
  const { language, setLanguageState } = useLanguage();
  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
    setLanguageState({ language: lng });
  };
  const { drawer: open, setDrawerState } = useWindowDimensions();

  const handleDrawer = () => {
    if (open !== undefined) setDrawerState({ open: !open });
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {auth.user && disableMenu &&(
           <IconButton
           edge="start"
           color="secondary"
           aria-label="open drawer"
           onClick={handleDrawer}
           size="large"
           sx={{
             marginRight: 5,
           }}
         >
           <MenuIcon sx={{ fontSize: 35 }} />
         </IconButton>
        )}

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ margin: auth.user ? "6px 0 -4px" : "6px 84px -4px" }}
          />
        </Typography>
        <Box>
          <ButtonLan
            variant={i18n.language === "th" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => changeLanguage("th")}
            sx={{ marginRight: 1 }}
          >
            ไทย
          </ButtonLan>
          <ButtonLan
            variant={i18n.language === "en" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => changeLanguage("en")}
          >
            EN
          </ButtonLan>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
