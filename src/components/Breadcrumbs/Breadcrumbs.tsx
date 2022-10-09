import Link, { LinkProps } from '@mui/material/Link';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  '/partner': 'Partner',
  '/partner/add':'Add',
};

export const ListItemLink = ({ to, open, ...other }: ListItemLinkProps) => {

  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink as any} to={to} {...other}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export const BreadcrumbsMap = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const {t} = useTranslation();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        {t("Home")}
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};