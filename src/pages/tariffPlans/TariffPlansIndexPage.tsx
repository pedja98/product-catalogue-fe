import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'
import Spinner from '../../components/Spinner'
import CustomTable from '../../components/CustomTable'
import { TableRowPerPage } from '../../consts/common'
import { useGetTariffPlansQuery } from '../../app/apis/tariff-plans.api'
import { getTariffPlansTableColumnsLabels, transformTableTariffPlanGridData } from '../../transformers/tariffPlan'

const TariffPlansIndexPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoading, data: tariffPlans, isError } = useGetTariffPlansQuery()

  const handleNavigateToCreatePage = () => {
    navigate(`${location.pathname}/create`)
  }

  const listPageTariffPlanGridData =
    tariffPlans?.map((tariffPlan) => transformTableTariffPlanGridData(tariffPlan)) || []

  const columns = getTariffPlansTableColumnsLabels(t)

  return (
    <Grid container sx={{ ml: 1, mt: 1 }}>
      <Grid item>
        <Typography variant='h4'>{t(`tariffPlans:title`).toLocaleUpperCase()}</Typography>
      </Grid>
      <Grid container direction='row' spacing={2}>
        <Grid item>
          <Button variant='contained' color='primary' sx={{ marginTop: 2 }} onClick={handleNavigateToCreatePage}>
            {t('general:create')}
          </Button>
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid>
          <Spinner />
        </Grid>
      ) : (
        !isError && (
          <Grid>
            <CustomTable columns={columns} rows={listPageTariffPlanGridData} rowPerPage={TableRowPerPage} />
          </Grid>
        )
      )}
    </Grid>
  )
}

export default TariffPlansIndexPage
