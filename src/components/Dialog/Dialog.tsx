import {
  Slide,
  Dialog as DialogDefault,
  SlideProps,
  DialogProps as DialogPropsDefault,
  styled,
} from "@mui/material";
import React, { ReactChild } from "react";
import { OnClickType } from "../../global/Interface.d";

const TransitionSlideUp = (props: SlideProps) => {
  return <Slide direction="up" {...props} />;
};
const TransitionSlideDown = (props: SlideProps) => {
  return <Slide direction="down" {...props} />;
};
const TransitionSlideLeft = (props: SlideProps) => {
  return <Slide direction="left" {...props} />;
};
const TransitionSlideRight = (props: SlideProps) => {
  return <Slide direction="right" {...props} />;
};
const BootstrapDialog = styled(DialogDefault)(({ theme }) => ({
  zIndex: "2300 !important",
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(3),
  },
}));

const Dialog: React.FC<DialogProps> = ({
  open = false,
  transition = "up",
  children,
  handleClose,
  ...rest
}) => {
  let TransitionComponent = TransitionSlideUp;
  if (transition === "left") TransitionComponent = TransitionSlideLeft;
  else if (transition === "right") TransitionComponent = TransitionSlideRight;
  else if (transition === "down") TransitionComponent = TransitionSlideDown;

  return (
    <div data-testid="dialog-container">
      <BootstrapDialog
        style={{ whiteSpace: "pre" }}
        open={open}
        TransitionComponent={TransitionComponent}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        onClose={handleClose}
        {...rest}
      >
        {children}
      </BootstrapDialog>
    </div>
  );
};

export interface DialogProps extends DialogPropsDefault {
  transition?: "down" | "left" | "right" | "up";
  children?: ReactChild | React.ReactNode | undefined;
  handleClose?: OnClickType; // (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default Dialog;
