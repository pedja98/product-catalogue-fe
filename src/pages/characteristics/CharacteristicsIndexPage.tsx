import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'
import { useGetCharacteristicsQuery } from '../../app/apis/characteristics.api'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import {
  getCharacteristicsTableColumnsLabels,
  transformTableCharacteristicGridData,
} from '../../transformers/characteristics'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'

const CharacteristicsIndexPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoading, data: chars, isError, error } = useGetCharacteristicsQuery()

  const handleNavigateToCreatePage = () => {
    navigate(`${location.pathname}/create`)
  }

  if (isError || !chars) {
    dispatch(
      setNotification({
        text: JSON.stringify(error),
        type: NotificationType.Error,
      }),
    )
  }

  const listPageCharGridData = chars?.map((char) => transformTableCharacteristicGridData(char)) || []

  const columns = getCharacteristicsTableColumnsLabels(t)

  return (
    <Grid container sx={{ ml: 1, mt: 1 }}>
      <Grid item>
        <Typography variant='h4'>{t(`characteristics:title`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid container direction='row' spacing={2}>
        <Grid item>
          <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleNavigateToCreatePage}>
            {t('general:create')}
          </Button>
        </Grid>
      </Grid>
      {!isError && !isLoading && !chars && (
        <Grid>
          <CustomTable columns={columns} rows={listPageCharGridData} rowPerPage={TableRowPerPage} />
        </Grid>
      )}
      {isLoading && (
        <Grid>
          <Spinner />
        </Grid>
      )}
    </Grid>
  )
}

export default CharacteristicsIndexPage
