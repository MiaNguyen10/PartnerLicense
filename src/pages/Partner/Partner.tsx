import { Container} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PartnerPageUrl } from '../../global/page';
import List from './components/List';

const Partner = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <List
        t={t}
        url={PartnerPageUrl}
      />
    </Container>
  )
}

export default Partner