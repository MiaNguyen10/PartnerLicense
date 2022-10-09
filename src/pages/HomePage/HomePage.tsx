import { Box, Container, List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import {
  BreadcrumbsMap,
  ListItemLink,
} from "../../components/Breadcrumbs/Breadcrumbs";

const HomePage = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <Typography variant="h3">{t("Partner")}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: 360 }}>
        <Routes>
          <Route path="*" element={<BreadcrumbsMap />} />
        </Routes>
          <List>
            <ListItemLink to="/partner" />
          </List>
      </Box>
    </Container>
  );
};

export default HomePage;
