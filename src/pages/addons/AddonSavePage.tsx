import { useTranslation } from 'react-i18next'
import { Button, Grid, Typography, SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import Spinner from '../../components/Spinner'
import GridField from '../../components/GridField'
import { SaveAddon, SaveAddonProps } from '../../types/addons'
import { createItemName } from '../../helpers/common'
import { ApiException } from '../../types/common'
import { useCreateAddonMutation } from '../../app/apis/addons.api'
import { getAddonSaveLabels, getSaveAddonGridData } from '../../transformers/addons'
import { SaveAddonFormInitialState } from '../../consts/addon'
import { Dayjs } from 'dayjs'

const AddonSavePage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createAddon, { isLoading: isCreatingAddon }] = useCreateAddonMutation()
  const [addonData, setAddonData] = useState<Partial<SaveAddonProps>>(SaveAddonFormInitialState)

  const labels = getAddonSaveLabels(t)
  const addonGridData = getSaveAddonGridData(addonData)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setAddonData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) || value === '' ? value : Number(value),
    }))
  }, [])

  const handleChangeDateTimePicker = useCallback((value: Dayjs | null, name: string) => {
    setAddonData((prevData) => ({
      ...prevData,
      [name]: value && value.isValid() ? value.toISOString() : '',
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(addonData).some(
        (key) =>
          addonGridData[key as keyof SaveAddonProps]?.required &&
          !String(addonData[key as keyof SaveAddonProps] || '').trim(),
      )
    ) {
      dispatch(setNotification({ text: t('fillAllRequiredFields'), type: NotificationType.Warning }))
      return
    }

    const itemName = createItemName(String(addonData.nameSrb), String(addonData.nameEng))

    try {
      const payload: SaveAddon = {
        name: itemName,
        identifier: addonData.identifier,
        description: addonData.description,
        price: addonData.price,
        validFrom: addonData.validFrom,
        validTo: addonData.validTo,
      } as SaveAddon

      const response = await createAddon(payload).unwrap()
      const messageCode = `addons:${response.message}`
      dispatch(setNotification({ text: t(messageCode), type: NotificationType.Success }))
      navigate('/addons')
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `addons:${errorResponse.data}` || 'general:unknownError'
      dispatch(setNotification({ text: t(errorCode), type: NotificationType.Error }))
    }
  }

  if (isCreatingAddon) return <Spinner />

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('addons:createAddonLabel').toUpperCase()}</Typography>
      </Grid>
      <Grid container item direction='column' spacing={2} sx={{ width: '80%' }}>
        {labels.map((label) => {
          const gridFieldData = addonGridData[label.key]
          return (
            <GridField
              key={label.key}
              gridFieldData={gridFieldData}
              label={label}
              handleChange={handleChange}
              handleChangeDateTimePicker={handleChangeDateTimePicker}
            />
          )
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

export default AddonSavePage
