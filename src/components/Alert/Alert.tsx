import React, { useCallback, useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import alertState from "./alertState";
import { styled } from "@mui/material";

const AUTO_HIDE_TIME = 10000;
const AlertStyle = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert ref={ref} {...props} />;
});

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  marginLeft:'37px',
  [theme.breakpoints.down("sm")]: {
    width:'500px',
  },
  [theme.breakpoints.up("md")]: {
    width:'1000px',
  },
  [theme.breakpoints.up("lg")]: {
    width:'1350px',
  },
}));
export interface State extends SnackbarOrigin {
  open: boolean;
}

const Alert: React.FC<AlertProps> = ({ ...rest }) => {
  const { t } = useTranslation();
  const timerAutoHide = useRef<number | any>(0);
  const [alert, setAlert] = useRecoilState(alertState);
  const [state, setState] = React.useState<State>({
    open: true,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = useCallback(() => {
    setAlert({
      message: "",
    });
    if (alert?.autohideFunction) alert.autohideFunction();
  }, [alert, setAlert]);

  useEffect(() => {
    if (alert.message && alert.autohide) {
      timerAutoHide.current = setTimeout(
        handleClose,
        alert?.autohideTime || AUTO_HIDE_TIME
      );
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [alert.autohide, alert?.autohideTime, alert.message, handleClose]);

  if (!alert.message) return null;

  return (
      <StyledSnackbar anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}>
        <AlertStyle
          severity={alert?.type} 
          onClose={alert?.showClose ? handleClose : undefined}
          {...rest}
          sx={{ width: "100%" }}
        >
          {alert?.isUseTranslation ? t(alert.message) : alert.message}
        </AlertStyle>
      </StyledSnackbar>
  );
};

export default Alert;
