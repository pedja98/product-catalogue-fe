import { useTranslation } from 'react-i18next'
import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'
import GridField from '../../components/GridField'
import Spinner from '../../components/Spinner'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { ApiException } from '../../types/common'
import { createItemName } from '../../helpers/common'
import { useCreateTariffPlanMutation } from '../../app/apis/tariff-plans.api'
import { SaveTariffPlan, SaveTariffPlanProps } from '../../types/tariffPlans'
import { getSaveTariffPlanGridData, getTariffPlanSaveLabels } from '../../transformers/tariffPlan'
import { SaveAddonFormInitialState } from '../../consts/addon'

const TariffPlansSavePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [createTariffPlan, { isLoading: isLoadingCreateTp }] = useCreateTariffPlanMutation()

  const { t } = useTranslation()
  const [tpData, setTpData] = useState<Partial<SaveTariffPlanProps>>(SaveAddonFormInitialState)

  const labels = getTariffPlanSaveLabels(t)
  const saveTpGridData = getSaveTariffPlanGridData(tpData)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setTpData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(tpData).some(
        (key) =>
          saveTpGridData[key as keyof SaveTariffPlanProps]?.required &&
          !String(tpData[key as keyof SaveTariffPlanProps] || '').trim(),
      )
    ) {
      dispatch(
        setNotification({
          text: t('fillAllRequiredFields'),
          type: NotificationType.Warning,
        }),
      )
      return
    }

    const itemName = createItemName(String(tpData.nameSrb), String(tpData.nameEng))
    const saveTariffPlanData: SaveTariffPlan = {
      name: itemName,
      description: tpData.description,
      identifier: tpData.identifier,
      price: tpData.price,
    } as SaveTariffPlan
    try {
      const response = await createTariffPlan(saveTariffPlanData).unwrap()
      const messageCode = `tariffPlan:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/tariff-plans`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `tariffPlan:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateTp) {
    return <Spinner />
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('tariffPlans:createTpLabel').toUpperCase()}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveTpGridData[label.key]
          return <GridField key={label.key} gridFieldData={gridFieldData} label={label} handleChange={handleChange} />
        })}
        <Grid item sx={{ width: '100%' }}>
          <Button variant='contained' sx={{ width: '100%' }} onClick={handleSave}>
            {t('general:saveButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TariffPlansSavePage
