import { useTranslation } from 'react-i18next'
import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import GridField from '../../components/GridField'
import Spinner from '../../components/Spinner'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiException, ItemStatus } from '../../types/common'
import { createItemName } from '../../helpers/common'
import {
  useCreateTariffPlanMutation,
  useGetTariffPlanByIdentifierQuery,
  useUpdateTariffPlanMutation,
} from '../../app/apis/tariff-plans.api'
import { SaveTariffPlan, SaveTariffPlanProps } from '../../types/tariffPlans'
import { getSaveTariffPlanGridData, getTariffPlanSaveLabels } from '../../transformers/tariffPlan'
import { SaveAddonFormInitialState } from '../../consts/addon'

const TariffPlansSavePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const tpIdentifier = params.identifier ? String(params.identifier) : ''

  const [createTariffPlan, { isLoading: isLoadingCreateTp }] = useCreateTariffPlanMutation()
  const [updateTariffPlan, { isLoading: isLoadingUpdateTp }] = useUpdateTariffPlanMutation()

  const { data: tariffPlan, isLoading: isLoadingGetTp } = useGetTariffPlanByIdentifierQuery(tpIdentifier, {
    skip: !tpIdentifier,
  })

  const { t } = useTranslation()
  const [tpData, setTpData] = useState<Partial<SaveTariffPlanProps>>(SaveAddonFormInitialState)

  useEffect(() => {
    if (tpIdentifier && tariffPlan) {
      setTpData({
        nameSrb: tariffPlan.name.sr,
        nameEng: tariffPlan.name.en,
        description: tariffPlan.description,
        identifier: tariffPlan.identifier,
        price: tariffPlan.price,
        status: tariffPlan.status,
      })
    }
  }, [tpIdentifier, tariffPlan])

  const itemStatusOptions = Object.keys(ItemStatus).map((status) => t(`statuses.${status}`))

  const labels = getTariffPlanSaveLabels(t, !tpIdentifier)
  const saveTpGridData = getSaveTariffPlanGridData(tpData, itemStatusOptions, Object.values(ItemStatus))

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
      status: tpIdentifier ? tpData.status : null,
    } as SaveTariffPlan
    try {
      const response = tpIdentifier
        ? await updateTariffPlan({ identifier: tpIdentifier, tariffPlan: saveTariffPlanData }).unwrap()
        : await createTariffPlan(saveTariffPlanData).unwrap()

      const messageCode = `tariffPlans:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/tariff-plans`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `tariffPlans:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateTp || isLoadingGetTp || isLoadingUpdateTp) {
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
