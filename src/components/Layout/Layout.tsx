import React, { ReactChild } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { Box } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Outlet} from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import MenuDrawer, { MenuDrawerWidth } from "./MenuDrawer";
import useWindowDimensions from "../../services/windowDimensions";
import { IUser } from "../../services/user.types";
import ProgressPage from "../Progress";
import Alert from "../Alert/Alert";

const drawerWidth = 256;
export const HeaderHeight = 64;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AlertStyle = styled(Alert)<DataContainerProps>`
  width: ${({ isDrawerOpen }) =>
    isDrawerOpen
      ? `calc(100% - 64px - ${MenuDrawerWidth}px)`
      : "calc(100% - 64px)"};
`;

interface DataContainerProps {
  isDrawerOpen?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout: React.FC<LayoutProps> = ({
  user,
  disableMenu,
  children,
  ...rest
}) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { isMobile, bottomTop } = useWindowDimensions();
  const { drawer: open, setDrawerState } = useWindowDimensions();

  const handleDrawer = () => {
    if (open !== undefined) setDrawerState({ open: !open });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Header
        disableMenu={disableMenu ? true : false}
        handleDrawer={handleDrawer}
      />
      {auth.user && (
        <Drawer variant="permanent" open={open} onClose={handleDrawer}>
          <DrawerHeader />
          <MenuDrawer
          t={t}
          handleDrawer={handleDrawer}
          isMobile={isMobile}
          bottomTop={bottomTop}
          headerHeight={HeaderHeight}
          open={open}
          {...rest}
        />
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <AlertStyle isDrawerOpen={open} />
        <ProgressPage isDrawerOpen={open} MenuDrawerWidth={MenuDrawerWidth} />
      </Box>
    </Box>
  );
};

export interface LayoutProps {
  user?: IUser | null;
  disableMenu?: boolean;
  children?: ReactChild | React.ReactNode | undefined;
  logout?: (() => Promise<void> | null) | null;
}

export default Layout;
