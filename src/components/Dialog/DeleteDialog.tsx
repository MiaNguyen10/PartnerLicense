import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { ReactChild, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BootstrapDialogTitle = ({
  children,
  onClose,
  ...other
}: DialogTitleProps) => {
  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "rgba(20, 47, 67, 0.87)",
            marginLeft: '340px',
          }}
        >
          <CloseIcon />
          <Typography variant="h4" sx={{ color: "rgba(20, 47, 67, 0.87)" }}>
            CLOSE
          </Typography>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const StyleBox = styled(Box)({
  width: "466px",
  height: "330px",
  boxShadow:
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
});

const StyleDialogActions = styled(DialogActions)({
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  margin:'0 16px',
});

const DeleteDialog: React.FC<DialogProps> = ({
  desc,
  handleSubmit,
  btnSubmit,
  handleClose,
  btnClose,
  children,
}) => {
  return (
    <StyleBox>
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      />
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" gutterBottom>
          {children || desc}
        </DialogContentText>
      </DialogContent>
      <StyleDialogActions>
        {handleSubmit && btnSubmit && (
          <Button onClick={handleSubmit} variant="contained" sx={{width: '94%', marginLeft:'8px'}}>
            {btnSubmit}
          </Button>
        )}
        {handleClose && btnClose && (
          <Button onClick={handleClose} variant="outlined">
            {btnClose}
          </Button>
        )}
      </StyleDialogActions>
    </StyleBox>
  );
};

export interface DialogProps {
  handleSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  desc?: ReactChild | ReactNode | undefined | string;
  btnClose: string;
  btnSubmit: string;
  children?: ReactChild;
}

export default DeleteDialog;
