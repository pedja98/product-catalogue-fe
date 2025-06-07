import { useParams } from 'react-router-dom'
import { useGetCharacteristicsByTariffPlanQuery } from '../../app/apis/tariff-plans-characteristics.api'
import { Grid, Typography } from '@mui/material'
import { getCurrentUserLanguage } from '../../helpers/common'
import { ItemName } from '../../types/common'
import { useTranslation } from 'react-i18next'
import ExpandableTable from '../../components/ExpandableTable'
import {
  getTariffPlanCharacteristicsTableColumnsLabels,
  transformTableTariffPlanCharacteristicGridData,
} from '../../transformers/tariffPlan'

const TariffPlansCharacteristicsRelationsPage = () => {
  const params = useParams()
  const tpIdentifier = params.identifier ? String(params.identifier) : ''

  const { data: tariffPlanChar, isLoading: isLoadingGetTpChar } = useGetCharacteristicsByTariffPlanQuery(tpIdentifier)

  const { t } = useTranslation()

  const handleRelationDelete = (id: number) => {
    console.log('l')
  }

  const handleCreateCharacteristicRelation = () => {
    console.log('l')
  }

  const charRelationTableGridData = tariffPlanChar?.characteristics
    ? tariffPlanChar?.characteristics.map((char) =>
        transformTableTariffPlanCharacteristicGridData(char, handleRelationDelete),
      )
    : []

  const charRelationTableColumLabels = getTariffPlanCharacteristicsTableColumnsLabels(t)

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>
          {t('tariffPlans:tariffPlanRelations') +
            ' ' +
            tariffPlanChar?.tariffPlan.name[getCurrentUserLanguage() as keyof ItemName]}
        </Typography>
      </Grid>
      <Grid sx={{ width: '100%' }}>
        <ExpandableTable
          expanded={true}
          title={t('tariffPlans:tariffPlanChars')}
          hideActionSection={false}
          expandableDialogAction={handleCreateCharacteristicRelation}
          isLoading={isLoadingGetTpChar}
          columns={charRelationTableColumLabels}
          rows={charRelationTableGridData}
        />
      </Grid>
    </Grid>
  )
}

export default TariffPlansCharacteristicsRelationsPage
