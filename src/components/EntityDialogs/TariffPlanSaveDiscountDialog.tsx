import { ChangeEvent, FC, useCallback, useState } from 'react'
import { SaveTariffPlanDiscount } from '../../types/tariffPlans'
import { SaveTariffPlanDiscountInitialState } from '../../consts/tariffPlans'
import { getSaveTariffPlanDiscountGridData, getSaveTariffPlanDiscountLabels } from '../../transformers/tariffPlan'
import { useTranslation } from 'react-i18next'
import { Button, Grid, SelectChangeEvent } from '@mui/material'
import { useAppDispatch } from '../../app/hooks'
import { hideConfirm } from '../../features/confirm.slice'
import GridField from '../GridField'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useCreateTariffPlanDiscountMutation } from '../../app/apis/tariff-plans-discounts.api'
import Spinner from '../Spinner'
import { ApiException } from '../../types/common'

const TariffPlanSaveDiscountDialog: FC<{ tariffPlanIdentifier: string; refetch: () => void }> = ({
  tariffPlanIdentifier,
  refetch,
}) => {
  const [discountData, setDiscountData] = useState<Partial<SaveTariffPlanDiscount>>({
    ...SaveTariffPlanDiscountInitialState,
    tariffPlanIdentifier,
  })
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [createTariffPlanDiscount, { isLoading: isLoadingCreateTariffPlanDiscount }] =
    useCreateTariffPlanDiscountMutation()

  const labels = getSaveTariffPlanDiscountLabels(t)
  const discountGridData = getSaveTariffPlanDiscountGridData(discountData)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setDiscountData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) || value === '' ? value : Number(value),
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(discountData).some(
        (key) =>
          discountGridData[key as keyof SaveTariffPlanDiscount]?.required &&
          !String(discountData[key as keyof SaveTariffPlanDiscount] || '').trim(),
      )
    ) {
      dispatch(setNotification({ text: t('fillAllRequiredFields'), type: NotificationType.Warning }))
      return
    }

    if (Number(discountData.maxAmountOfTariffPlans) <= Number(discountData.minAmountOfTariffPlans)) {
      dispatch(setNotification({ text: t('tariffPlans:maxTpLowerThenMin'), type: NotificationType.Warning }))
      return
    }

    if (Number(discountData.discount) > 100) {
      dispatch(setNotification({ text: t('tariffPlans:discountBadValue'), type: NotificationType.Warning }))
      return
    }

    try {
      const response = await createTariffPlanDiscount(discountData).unwrap()
      const messageCode = `tariffPlans:${response.message}`
      refetch()
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
    } catch (error) {
      const errorResponse = error as { data: ApiException }
      const errorCode = `tariffPlans:${errorResponse.data}` || 'general:unknownError'

      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  if (isLoadingCreateTariffPlanDiscount) {
    return <Spinner />
  }

  return (
    <Grid sx={{ mt: 2 }}>
      {labels.map((label) => {
        const gridFieldData = discountGridData[label.key]
        return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
      })}
      <Grid sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Button sx={{ width: '49%' }} color='primary' onClick={handleSave} variant='contained'>
          {t('general:create')}
        </Button>
        <Button
          variant='contained'
          sx={{ width: '49%' }}
          onClick={() => {
            dispatch(hideConfirm())
          }}
          color='primary'
        >
          {t('general:close')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default TariffPlanSaveDiscountDialog
