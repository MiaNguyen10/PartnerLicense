import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { useAuth } from "../../context/AuthContext";
import {
  OnClickType,
  ThemeProps,
  TranslationType,
} from "../../global/Interface.d";
import { IUser } from "../../services/user.types";
import { styled as MuiStyled } from "@mui/material/styles";

export const MenuDrawerWidth = 256;
export const MenuDrawerMarginLeft = 10;
export const MenuDrawerMarginRight = 16;

const MenuContianer = styled.div<ThemeProps>`
  ${({ isMobile, headerHeight, bottomTop = 0 }) => {
    return css`
      width: ${isMobile ? `100vw` : `${MenuDrawerWidth}px`};
      overflow: scroll !important;
      height: calc(100vh - ${headerHeight}px);
      padding-bottom: ${bottomTop}px;

      .MuiList-root {
        width: ${isMobile ? `100vw` : `${MenuDrawerWidth}px`};
        overflow-x: hidden;
      }
    `;
  }}
`;

const SpaceMobile = styled.div<ThemeProps>`
  ${({ bottomTop = 0 }) => {
    return css`
      width: 100%;
      height: ${bottomTop}px;
    `;
  }}
`;

const AvatarStyle = styled(Avatar)`
  margin: 16px ${MenuDrawerMarginRight}px 0 ${MenuDrawerMarginLeft}px;
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: 1;

  .MuiPaper-root {
    background-color: unset;
    border: 0xp solid RED;
  }
  .MuiPaper-elevation1 {
    box-shadow: none;
  }
`;

const UserSubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const ListItemLink = MuiStyled(ListItem)({
  border: "none",
  borderRadius: "4px",
  margin: "0 5px",
  "&:hover": {
    background: "#F8CB2E",
  },
});

interface MenuDrawerProps {
  isMobile?: boolean;
  bottomTop?: number;
  headerHeight?: number;
  handleDrawer?: OnClickType;
  open?: boolean;
  t?: TranslationType;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isMobile,
  bottomTop = 0,
  handleDrawer,
  headerHeight,
  open,
  t,
}) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const signout = () => {
    auth.signout(() => navigate("/login"));
    localStorage.clear();
  };
  const [username, setUsername] = useState<string>();
  useEffect(() => {
    // @ts-ignore
    const name = JSON.parse(localStorage.getItem("username"));
    if (name) {
      setUsername(name);
    }
  }, []);

  return (
    <MenuContianer
      isMobile={isMobile}
      headerHeight={headerHeight}
      role="presentation"
      onKeyDown={handleDrawer}
    >
      <UserContainer>
        <UserSubContainer>
          {!open ? (
            <AvatarStyle sx={{ margin: "20px 80px 10px 15px" }}>
              {username?.substring(0, 1).toLocaleUpperCase()}
            </AvatarStyle>
          ) : (
            <Typography variant="h3" sx={{ margin: "20px 80px 10px 15px" }}>
              {username}
            </Typography>
          )}
        </UserSubContainer>
        <List>
          {/* profile */}
          <ListItemLink
            disablePadding
            sx={{ display: "block", width: open ? "92%" : "20%" }}
            onClick={() => navigate("/")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: handleDrawer ? "initial" : "center",
                px: 1.5,
                paddingLeft: "16px",
                paddingTop: "15px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: handleDrawer ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM10 4C10 2.9 9.1 2 8 2C6.9 2 6 2.9 6 4C6 5.1 6.9 6 8 6C9.1 6 10 5.1 10 4ZM14 13C13.8 12.29 10.7 11 8 11C5.3 11 2.2 12.29 2 13.01V14H14V13ZM0 13C0 10.34 5.33 9 8 9C10.67 9 16 10.34 16 13V16H0V13Z"
                    fill="#3F3F3F"
                    fillOpacity="0.87"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary={t("MyProfile")}
                sx={{ opacity: handleDrawer ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItemLink>
          {/* partner */}
          <ListItemLink
            disablePadding
            sx={{ display: "block", width: open ? "92%" : "20%" }}
            onClick={() => navigate("/partner")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: handleDrawer ? "initial" : "center",
                px: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: handleDrawer ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                    fill="#006E7F"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary={t("Partner")}
                sx={{ opacity: handleDrawer ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItemLink>
          {/* logout */}
          <ListItemLink
            disablePadding
            sx={{ display: "block", width: open ? "92%" : "20%" }}
            onClick={() => signout()}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: handleDrawer ? "initial" : "center",
                px: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: handleDrawer ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.59 7.41L15.17 11H1V13H15.17L11.58 16.59L13 18L19 12L13 6L11.59 7.41ZM20 6V18H22V6H20Z"
                    fill="black"
                    fillOpacity="0.54"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary={t("Logout")}
                sx={{ opacity: handleDrawer ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItemLink>
        </List>
      </UserContainer>
      <SpaceMobile bottomTop={bottomTop} />
    </MenuContianer>
  );
};

export default MenuDrawer;
