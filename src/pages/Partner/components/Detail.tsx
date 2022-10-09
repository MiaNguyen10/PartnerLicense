import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { styled as MuiStyled } from "@mui/system";
import React, { useMemo } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IPartnerAdd } from "../../../services/partner.types";
import { disableButton } from "../../../services/button";
import { Route, Routes, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/system";
import { BreadcrumbsMap } from "../../../components/Breadcrumbs/Breadcrumbs";
import usePartner from "../../../services/partner-hook";

const BoxMui = MuiStyled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginLeft: "30px",
    marginBottom: "30px",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: "30px",
    marginBottom: "30px",
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: "100px",
    marginBottom: "70px",
  },
}));

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { detail, get } = usePartner();
  const url = "partner";
  const defaultValues = useMemo<IPartnerAdd>(() => {
    return {
      partnerId: "",
      partnerSecret: "",
    };
  }, []);

  const schema = yup.object().shape({
    partnerId: yup.string().required(t("PartnerIDInputErrorValidation")),
    partnerSecret: yup
      .string()
      .required(t("PartnerSecretInputErrorValidation")),
  });

  const methods = useForm<IPartnerAdd>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (dataPost: IPartnerAdd) => {
    disableButton(true);

    const updateData: IPartnerAdd = {
      partnerId: dataPost?.partnerId,
      partnerSecret: dataPost?.partnerSecret,
    };
    
    disableButton(false);
  };

  const handleClose = () => {
    navigate(`/${url}`);
  };

  return (
    <Container>
      <BoxMui>
        <Typography variant="h3">{t("Partner")}</Typography>
        <Routes>
          <Route path="*" element={<BreadcrumbsMap />} />
        </Routes>
      </BoxMui>
      {/* <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg:8 }}>
              <Grid item sm={12} md={12} lg={6}>
                <div>
                  <Typography variant="h5">{t("PartnerID")}</Typography>
                  <Controller
                    name="partnerId"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        name="partnerId"
                        type="text"
                        id="standard-size-normal"
                        variant="standard"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoComplete="off"
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <div>
                  <Typography variant="h5">{t("pSecret")}</Typography>
                  <Controller
                    name="partnerSecret"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        name="partnerSecret"
                        type="text"
                        id="standard-size-normal"
                        variant="standard"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoComplete="off"
                      />
                    )}
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{ width: "100%" }}
                >
                  {t("PageActionCancelButton")}
                </Button>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  {t("PageActionSubmitButton")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </FormProvider> */}
    </Container>
  );
};

export default Detail;
