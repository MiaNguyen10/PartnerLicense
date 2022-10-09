import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styled as muiStyled, Box } from "@mui/system";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { emailRegExp, passwordRegExp } from "../../utils/regexFormat";

interface IFormInputs {
  username: string;
  password: string;
}

const LoginContainer = muiStyled(Box)<any>((props: any) => ({
  height: "380px",
  background: "#ffffff",
  boxShadow:
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
  borderRadius: "4px",
  marginTop: "100px",
  [props.theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Login: FC = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  let auth = useAuth();
  const [token, setToken] = useState(false);

  const schema = yup
    .object()
    .shape({
      username: yup.string().required(t("LoginEmailInputErrorValidation")),
      // .matches(emailRegExp, t("LoginEmailInputErrorFormat")),
      password: yup.string().required(t("LoginPasswordInputErrorValidation")),
      // .matches(passwordRegExp, t("LoginPasswordInputErrorFormat")),
    })
    .required();

  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleSubmit, control } = methods;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onHandleSubmit = (data: IFormInputs) => {
    auth.signin(data, () => {
      navigate("/", { replace: true });
    });
    localStorage.setItem("username", JSON.stringify(data.username));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 16px;
  `;

  const LoginHeader = styled.h2`
    font-weight: 400;
    font-size: 36px;
    line-height: 133.4%;
    color: rgba(20, 47, 67, 0.87);
    padding-left: 16px;
  `;

  return (
    <>
      <FormProvider {...methods}>
        <Box display={"flex"} justifyContent="center">
          <LoginContainer>
            <LoginHeader>{t("Login")}</LoginHeader>
            <LoginForm onSubmit={handleSubmit(onHandleSubmit)}>
              <Typography>Username</Typography>

              <Controller
                name="username"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    name="username"
                    type="text"
                    id="standard-size-normal"
                    variant="standard"
                    sx={{ width: 376 }}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    autoComplete="off"
                  />
                )}
              />
              <Typography sx={{ marginTop: 2 }}>Password</Typography>
              <Controller
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="standard-size-normal"
                    variant="standard"
                    sx={{ width: 376 }}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: 42 }}
              >
                {t("Login")}
              </Button>
            </LoginForm>
          </LoginContainer>
        </Box>
      </FormProvider>
    </>
  );
};

export default Login;
