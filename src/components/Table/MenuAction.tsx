import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {  IconButton, Menu, MenuItem, MenuProps } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { OnClickType } from "../../global/Interface";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 4,
    minWidth: 79,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "&:hover":{
        backgroundColor: theme.palette.secondary.main
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const MenuAction: React.FC<MenuActionProps> = ({ submenu }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {submenu?.map((_submenu, index) => (
          <MenuItem
            key={`table-item-${index}`}
            disableRipple
            onClick={
              _submenu?.link ? _submenu?.link : _submenu?.onClick || null
            }
          >
            {_submenu?.name}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default MenuAction;

export interface SubmenuProps {
  name: string;
  link?: OnClickType;
  onClick?: OnClickType;
}
export interface MenuActionProps {
  submenu?: Array<SubmenuProps>;
}
