import { FC } from 'react'
import { Grid } from '@mui/material'
import { EntityConfirmationDialogOptions } from '../../../types/common'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../../app/hooks'
import { hideConfirm, showConfirm } from '../../../features/confirm.slice'
import { setNotification } from '../../../features/notifications.slice'
import { NotificationType } from '../../../types/notification'
import {
  getTariffPlanDiscountsTableColumnsLabels,
  transformTableTariffPlanDiscountGridData,
} from '../../../transformers/tariffPlan'
import Spinner from '../../../components/Spinner'
import ExpandableTable from '../../../components/ExpandableTable'
import { TariffPlanDiscountsTableProps } from '../../../types/tariffPlans'
import { useDeleteTariffPlanDiscountMutation } from '../../../app/apis/tariff-plans-discounts.api'

const TariffPlanDiscountsTable: FC<TariffPlanDiscountsTableProps> = ({
  tariffPlanIdentifier,
  discounts,
  isLoading,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [deleteTariffPlanDiscount, { isLoading: isDeleting }] = useDeleteTariffPlanDiscountMutation()

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const handleDiscountRelationDelete = (id: string) => {
    dispatch(
      showConfirm({
        confirmationText: t('tariffPlans:tariffPlanDiscountRelationDeletionText'),
        confirmationTitle: t('general:confirmDeletionTitle'),
        onConfirm: () => handleConfirmDiscountRelationDelete(id),
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmDiscountRelationDelete = async (id: string) => {
    try {
      const response = await deleteTariffPlanDiscount({ id, tariffPlanIdentifier }).unwrap()
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

  const handleCreateDiscountRelation = () => {
    dispatch(
      showConfirm({
        confirmationTitle: t('tariffPlans:createDiscount').toUpperCase(),
        customConfirmComponentCode: EntityConfirmationDialogOptions.TariffPlanSaveDiscountDialog,
        customConfirmComponentAttributes: {
          tariffPlanIdentifier,
        },
      }),
    )
  }

  const discountTableGridData = discounts.map((discount) =>
    transformTableTariffPlanDiscountGridData(discount, handleDiscountRelationDelete),
  )

  const discountTableColumnLabels = getTariffPlanDiscountsTableColumnsLabels(t)

  if (isDeleting) {
    return <Spinner />
  }

  return (
    <Grid sx={{ width: '100%' }}>
      <ExpandableTable
        expanded
        title={t('tariffPlans:tariffPlanDiscounts')}
        hideActionSection={false}
        expandableDialogAction={handleCreateDiscountRelation}
        isLoading={isLoading}
        columns={discountTableColumnLabels}
        rows={discountTableGridData}
      />
    </Grid>
  )
}

export default TariffPlanDiscountsTable
