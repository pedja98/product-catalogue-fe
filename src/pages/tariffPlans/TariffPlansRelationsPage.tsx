import { useParams } from 'react-router-dom'
import { useGetCharacteristicsByTariffPlanIdentifierQuery } from '../../app/apis/tariff-plans-characteristics.api'
import TariffPlanCharacteristicsTable from './tables/TariffPlansCharacteristicsTable'
import { Divider, Grid, Typography } from '@mui/material'
import { ItemName } from '../../types/common'
import { getCurrentUserLanguage } from '../../helpers/common'
import { useTranslation } from 'react-i18next'
import { useGetTariffPlanDiscountsByTariffPlanIdentifierQuery } from '../../app/apis/tariff-plans-discounts.api'
import TariffPlanDiscountsTable from './tables/TariffPlanDiscountsTable'

const TariffPlansRelationsPage = () => {
  const params = useParams()
  const tariffPlanIdentifier = params.identifier ? String(params.identifier) : ''
  const { t } = useTranslation()

  const { data: tariffPlanChars, isLoading: isGetCharacteristicsByTariffPlanIdentifierLoading } =
    useGetCharacteristicsByTariffPlanIdentifierQuery(tariffPlanIdentifier)

  const { data: tariffPlanDiscounts, isLoading: isGetTariffPlanDiscountsByTariffPlanIdentifierLoading } =
    useGetTariffPlanDiscountsByTariffPlanIdentifierQuery(tariffPlanIdentifier)

  if (!tariffPlanChars || !tariffPlanDiscounts) return null

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>
          {t('tariffPlans:tariffPlanRelations') +
            ' ' +
            tariffPlanChars.tariffPlan.name[getCurrentUserLanguage() as keyof ItemName]}
        </Typography>
      </Grid>
      <Divider />
      <TariffPlanCharacteristicsTable
        tariffPlanId={tariffPlanChars.tariffPlan.id}
        characteristics={tariffPlanChars.characteristics}
        isLoading={isGetCharacteristicsByTariffPlanIdentifierLoading}
      />
      <Divider />
      <TariffPlanDiscountsTable
        tariffPlanIdentifier={tariffPlanDiscounts.tariffPlan.identifier}
        discounts={tariffPlanDiscounts.discounts}
        isLoading={isGetTariffPlanDiscountsByTariffPlanIdentifierLoading}
      />
    </Grid>
  )
}

export default TariffPlansRelationsPage
