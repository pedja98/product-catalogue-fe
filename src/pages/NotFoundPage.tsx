import { Typography } from '@mui/material'
import { ButtonStyled, Root } from '../styles/common'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Root>
      <Typography variant='h1'>{t('pageNotFound')}</Typography>
      <ButtonStyled variant='contained' onClick={handleGoBack} sx={{ marginTop: 2 }}>
        {t('backToPreviousPage')}
      </ButtonStyled>
    </Root>
  )
}

export default NotFoundPage
