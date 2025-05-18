import { useTranslation } from 'react-i18next'
import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'
import { SaveCharacteristic, SaveCharacteristicFormProps } from '../../types/characteristics'
import { SaveCharFormInitialState } from '../../consts/characteristics'
import { getCharacteristicsSaveLabels, getSaveCharacteristicGridData } from '../../transformers/characteristics'
import GridField from '../../components/GridField'
import { useCreateCharacteristicMutation } from '../../app/apis/characteristics.api'
import Spinner from '../../components/Spinner'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate } from 'react-router-dom'
import { ApiException } from '../../types/common'
import { createItemName } from '../../helpers/common'

const CharacteristicsSavePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [createCharacteristic, { isLoading: isLoadingCreateChar }] = useCreateCharacteristicMutation()

  const { t } = useTranslation()
  const [charData, setCharData] = useState<Partial<SaveCharacteristicFormProps>>(SaveCharFormInitialState)

  const labels = getCharacteristicsSaveLabels(t)
  const saveCharacteristicGridData = getSaveCharacteristicGridData(charData)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setCharData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(charData).some(
        (key) =>
          saveCharacteristicGridData[key as keyof SaveCharacteristicFormProps]?.required &&
          !String(charData[key as keyof SaveCharacteristicFormProps] || '').trim(),
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

    const itemName = createItemName(String(charData.nameSrb), String(charData.nameEng))
    const saveCharData = { ...charData, name: itemName } as SaveCharacteristic
    try {
      const response = await createCharacteristic(saveCharData).unwrap()
      const messageCode = `companies:${response.message}`
      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/index/characteristics`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `companies:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateChar) {
    return <Spinner />
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>{t('characteristics:createCharLabel').toUpperCase()}</Typography>
      </Grid>
      <Grid container item sx={{ width: '80%' }} direction='column' spacing={2}>
        {labels.map((label) => {
          const gridFieldData = saveCharacteristicGridData[label.key]
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

export default CharacteristicsSavePage
