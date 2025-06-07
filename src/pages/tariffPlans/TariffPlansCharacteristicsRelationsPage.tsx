import { useParams } from 'react-router-dom'
import {
  useDeleteTariffPlanCharacteristicMutation,
  useGetCharacteristicsByTariffPlanQuery,
} from '../../app/apis/tariff-plans-characteristics.api'
import { Grid, Typography } from '@mui/material'
import { getCurrentUserLanguage } from '../../helpers/common'
import { EntityConfirmationDialogOptions, ItemName } from '../../types/common'
import { useTranslation } from 'react-i18next'
import ExpandableTable from '../../components/ExpandableTable'
import {
  getTariffPlanCharacteristicsTableColumnsLabels,
  transformTableTariffPlanCharacteristicGridData,
} from '../../transformers/tariffPlan'
import { useAppDispatch } from '../../app/hooks'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import Spinner from '../../components/Spinner'
import { NotificationType } from '../../types/notification'
import { setNotification } from '../../features/notifications.slice'

const TariffPlansCharacteristicsRelationsPage = () => {
  const params = useParams()
  const tpIdentifier = params.identifier ? String(params.identifier) : ''

  const {
    data: tariffPlanChar,
    isLoading: isLoadingGetTpChar,
    refetch: refetchTariffPlanCharacteristics,
  } = useGetCharacteristicsByTariffPlanQuery(tpIdentifier)

  const [deleteTariffPlanCharacteristic, { isLoading: isDeleteTariffPlanCharacteristicLoading }] =
    useDeleteTariffPlanCharacteristicMutation()

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const handleCharRelationDelete = (id: string) => {
    dispatch(
      showConfirm({
        confirmationText: t('tariffPlans:tariffPlanCharRelationDeletionText'),
        confirmationTitle: t('general:confirmDeletionTitle'),
        onConfirm: () => handleConfirmCharRelationDelete(id),
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmCharRelationDelete = async (id: string) => {
    try {
      const response = await deleteTariffPlanCharacteristic(String(id)).unwrap()
      const messageCode = `tariffPlans:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (error) {
      dispatch(
        setNotification({
          text: JSON.stringify(error),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  const handleCreateCharacteristicRelation = () => {
    dispatch(
      showConfirm({
        confirmationTitle: t('tariffPlans:addCharacteristic').toUpperCase(),
        customConfirmComponentCode: EntityConfirmationDialogOptions.TariffPlanAddCharacteristicDialog,
        customConfirmComponentAttributes: {
          tariffPlanId: tariffPlanChar?.tariffPlan.id,
          refetch: refetchTariffPlanCharacteristics,
        },
      }),
    )
  }

  const charRelationTableGridData = tariffPlanChar?.characteristics
    ? tariffPlanChar?.characteristics.map((char) =>
        transformTableTariffPlanCharacteristicGridData(char, handleCharRelationDelete),
      )
    : []

  const charRelationTableColumLabels = getTariffPlanCharacteristicsTableColumnsLabels(t)

  if (isDeleteTariffPlanCharacteristicLoading) {
    return <Spinner />
  }

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
