import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Routes, Route, useNavigate } from "react-router";
import { BreadcrumbsMap } from "../../../components/Breadcrumbs/Breadcrumbs";
import { PageUrlProps, TranslationType } from "../../../global/Interface";
import useLoader from "../../../services/loader-hook";
import * as yup from "yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Table, {
  ColumnProps,
  TablePageProps,
} from "../../../components/Table/Table";
import usePartner from "../../../services/partner-hook";
import {
  MidScreenSize,
  MobileScreenSize,
  ProjectSelectStatusTag,
  PROJECTSTATUS,
  TabletScreenSize,
} from "../../../global/config";
import MenuAction from "../../../components/Table/MenuAction";
import Dialog from "../../../components/Dialog/Dialog";
import DeleteDialog from "../../../components/Dialog/DeleteDialog";
import { IPartner, IPartners } from "../../../services/partner.types";

type SearchProps = {
  id: string;
};

export interface ListProps extends PageUrlProps {
  t?: TranslationType;
}

const ContainerForm = styled.div`
  margin-top: 30px;
  grid-area: search;
  align-item: stretch;
  @media only screen and (max-width: ${MidScreenSize}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (max-width: ${TabletScreenSize}px) {
    span {
      height: 0px;
    }
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: ${MobileScreenSize}px) {
    grid-template-columns: 1fr;
  }
`;

const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: button;
  @media only screen and (max-width: ${MidScreenSize}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (max-width: ${TabletScreenSize}px) {
    span {
      height: 0px;
    }
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: ${MobileScreenSize}px) {
    grid-template-columns: 1fr;
  }
`;

const SearchContainer = styled.form`
  display: grid;
  grid-template-columns: 80px 330px;
  grid-template-rows: auto auto;
  justify-content: space-between;
  grid-template-areas:
    "box button"
    "search button";
`;

const List: React.FC<ListProps> = ({ t, url }) => {
  const { openLoader, closeLoader } = useLoader();
  const { data, deletePartner } = usePartner();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const navigate = useNavigate();
  if (data) {
    closeLoader();
  } else {
    openLoader();
  }

  const defaultValues = {
    id: "",
  };

  const page = useRef<number>(0);
  const limit = useRef<number>(0);
  const [limitPage, setLimit] = useState(0);
  const [pageC, setPage] = useState(0);
  const [dataPartner, setDataPartner] = useState<(IPartner | null)[] | undefined | null>(data && data?.data);
  useEffect(() => {
    setDataPartner(data && data?.data);
  }, [data?.data]);
  const schema = yup.object().shape({
    id: yup.string(),
  });
  const methods = useForm<SearchProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  const columns: Array<ColumnProps> = [
    { id: "no", label: t("No"), align: "left" },
    { id: "id", label: t("PartnerID"), align: "left" },
    { id: "project", label: t("Project"), align: "left" },
    { id: "status", label: t("Status"), align: "left" },
    { id: "timeupdate", label: t("TimeUpdate"), align: "left" },
    { id: "action", label: "", align: "left" },
  ];

  const rows = dataPartner
    ?.filter((_dataPartner) => !_dataPartner?.id?.includes("deleted"))
    .map((_data, i) => {
      const rID = _data?.id;
      const actionSubmenu: any = [];
      actionSubmenu.push({
        name: t("PageActionViewButton"),
        link: rID ? () => navigate(`/${url}/${rID}`) : null,
      });
      actionSubmenu.push({
        name: t("PageActionEditButton"),
        link: rID ? () => navigate(`/${url}/edit/${rID}`) : null,
      });
      actionSubmenu.push({
        name: t("PageActionDeleteButton"),
        onClick: rID
          ? () => {
              setOpen(true);
              setId(rID);
              
            }
          : null,
      });
      return {
        key: i,
        no: page.current * limit.current + (i + 1),
        id: _data?.id,
        project: _data?.project,
        status:
          _data?.isActive === true
            ? t(ProjectSelectStatusTag[PROJECTSTATUS.ACTIVE].text)
            : t(ProjectSelectStatusTag[PROJECTSTATUS.NOTACTIVE].text),
        timeupdate: dayjs(_data?.lastUpdateDate).format(
          "DD/MM/YYYY, h:mm:ss A"
        ),
        action:
          actionSubmenu?.length > 0 ? (
            <MenuAction submenu={actionSubmenu} />
          ) : null,
      };
    });

  let totalRows = dataPartner?.filter(
    (x) => !x?.id?.includes("deleted")
  ).length;

  const onSearch = (search: SearchProps) => {
    page.current = 0;
    if (data && data?.data) {
      data.data = data?.data.filter((_dataP) =>
        _dataP?.id?.includes(search.id)
      );
      setDataPartner(data.data);
    }
    setPage(0);
  };

  const handleChangeData = (pageChange: TablePageProps) => {
    setLimit(pageChange?.limit || 0);
    setPage(pageChange?.page || 0);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  const handleDeleteItem = (partnerId: string | undefined) => {
    if (partnerId !== undefined) {
      deletePartner(partnerId);
    }
    setDataPartner(dataPartner?.filter((el) => el?.id !== partnerId));
    handleCancelDelete();
  };

  return (
    <>
      <FormProvider {...methods}>
        <SearchContainer onSubmit={handleSubmit(onSearch)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 360,
            }}
          >
            <Typography variant="h3">{t("Partner")}</Typography>
            <Routes>
              <Route path="*" element={<BreadcrumbsMap />} />
            </Routes>
          </Box>
          <ContainerForm>
            <Typography variant="h5">{t("PartnerID")}</Typography>
            <Controller
              name="id"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  name="id"
                  type="text"
                  id="standard-size-normal"
                  variant="standard"
                  value={value}
                  sx={{ width: 330 }}
                  onChange={onChange}
                  error={!!error}
                  autoComplete="off"
                />
              )}
            />
          </ContainerForm>
          <ContainerButton>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(`/${url}/add`)}
            >
              <>
                <AddIcon />
                <div>{t("AddP")}</div>
              </>
            </Button>
            <span>&nbsp;</span>
            <Button type="submit" variant="contained">
              <div>{t("Search")}</div>
            </Button>
          </ContainerButton>
        </SearchContainer>
      </FormProvider>
      <br />
      <Table
        rows={rows}
        columns={columns}
        total={totalRows}
        onClick={handleChangeData}
        page={pageC}
        limit={limitPage}
      />

      <Dialog open={open} handleClose={handleCancelDelete}>
        <DeleteDialog
          handleSubmit={() => {
            handleDeleteItem(id);
            
          }}
          handleClose={handleCancelDelete}
          desc={`Are you sure delete partner ${id}`}
          btnSubmit={t("PageActionSubmitButton")}
          btnClose={t("PageActionCancelButton")}
        />
      </Dialog>
    </>
  );
};

export default List;
