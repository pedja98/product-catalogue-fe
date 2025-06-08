import { FC } from 'react'
import { Grid } from '@mui/material'
import { EntityConfirmationDialogOptions } from '../../../types/common'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../app/hooks'
import { useDeleteTariffPlanCharacteristicMutation } from '../../../app/apis/tariff-plans-characteristics.api'
import { hideConfirm, showConfirm } from '../../../features/confirm.slice'
import { setNotification } from '../../../features/notifications.slice'
import { NotificationType } from '../../../types/notification'
import {
  getTariffPlanCharacteristicsTableColumnsLabels,
  transformTableTariffPlanCharacteristicGridData,
} from '../../../transformers/tariffPlan'
import Spinner from '../../../components/Spinner'
import ExpandableTable from '../../../components/ExpandableTable'
import { TariffPlanCharacteristicChar } from '../../../types/tariffPlans'

interface Props {
  tariffPlanId: string
  characteristics: TariffPlanCharacteristicChar[]
  refetch: () => void
  isLoading: boolean
}

const TariffPlanCharacteristicsTable: FC<Props> = ({ tariffPlanId, characteristics, refetch, isLoading }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [deleteTariffPlanCharacteristic, { isLoading: isDeleting }] = useDeleteTariffPlanCharacteristicMutation()

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
      const response = await deleteTariffPlanCharacteristic(id).unwrap()
      const messageCode = `tariffPlans:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      refetch()
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
          tariffPlanId,
          refetch,
        },
      }),
    )
  }

  const charRelationTableGridData = characteristics.map((char) =>
    transformTableTariffPlanCharacteristicGridData(char, handleCharRelationDelete),
  )

  const charRelationTableColumLabels = getTariffPlanCharacteristicsTableColumnsLabels(t)

  if (isDeleting) {
    return <Spinner />
  }

  return (
    <Grid sx={{ width: '100%' }}>
      <ExpandableTable
        expanded
        title={t('tariffPlans:tariffPlanChars')}
        hideActionSection={false}
        expandableDialogAction={handleCreateCharacteristicRelation}
        isLoading={isLoading}
        columns={charRelationTableColumLabels}
        rows={charRelationTableGridData}
      />
    </Grid>
  )
}

export default TariffPlanCharacteristicsTable
