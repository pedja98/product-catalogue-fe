import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'
import { useGetAddonsQuery } from '../../app/apis/addons.api'
import { getAddonsTableColumnsLabels, transformTableAddonGridData } from '../../transformers/addons'
import CustomTable from '../../components/CustomTable'
import Spinner from '../../components/Spinner'
import { TableRowPerPage } from '../../consts/common'

const AddonIndexPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoading, data: addons, isError } = useGetAddonsQuery()

  const handleNavigateToCreatePage = () => {
    navigate(`${location.pathname}/create`)
  }

  const listPageAddonGridData = addons?.map((addon) => transformTableAddonGridData(addon, t)) || []

  const columns = getAddonsTableColumnsLabels(t)

  return (
    <Grid container sx={{ ml: 1, mt: 1 }}>
      <Grid item>
        <Typography variant='h4'>{t(`addons:title`).toLocaleUpperCase()}</Typography>
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
            <CustomTable columns={columns} rows={listPageAddonGridData} rowPerPage={TableRowPerPage} />
          </Grid>
        )
      )}
    </Grid>
  )
}

export default AddonIndexPage
