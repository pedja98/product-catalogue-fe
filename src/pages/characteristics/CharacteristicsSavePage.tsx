import { useTranslation } from 'react-i18next'
import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SaveCharacteristic, SaveCharacteristicFormProps } from '../../types/characteristics'
import { SaveCharFormInitialState } from '../../consts/characteristics'
import { getCharacteristicsSaveLabels, getSaveCharacteristicGridData } from '../../transformers/characteristics'
import GridField from '../../components/GridField'
import {
  useCreateCharacteristicMutation,
  useGetCharacteristicByIdentifierQuery,
  useUpdateCharacteristicMutation,
} from '../../app/apis/characteristics.api'
import Spinner from '../../components/Spinner'
import { useAppDispatch } from '../../app/hooks'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiException } from '../../types/common'
import { createItemName } from '../../helpers/common'

const CharacteristicsSavePage = () => {
  const params = useParams()
  const charIdentifier = params.identifier ? String(params.identifier) : ''

  const { data: characteristic, isLoading: isLoadingGetCharacteristicByIdentifier } =
    useGetCharacteristicByIdentifierQuery(charIdentifier, {
      skip: !charIdentifier,
    })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createCharacteristic, { isLoading: isLoadingCreateChar }] = useCreateCharacteristicMutation()
  const [updateCharacteristic, { isLoading: isLoadingUpdateChar }] = useUpdateCharacteristicMutation()

  const { t } = useTranslation()

  const [saveCharFormData, setSaveCharFormData] =
    useState<Partial<SaveCharacteristicFormProps>>(SaveCharFormInitialState)

  useEffect(() => {
    if (charIdentifier && characteristic) {
      setSaveCharFormData({
        nameSrb: characteristic.name.sr,
        nameEng: characteristic.name.en,
        description: characteristic.description,
        identifier: characteristic.identifier,
        value: characteristic.value,
      })
    }
  }, [charIdentifier, characteristic])

  const labels = getCharacteristicsSaveLabels(t, !charIdentifier)
  const saveCharacteristicGridData = getSaveCharacteristicGridData(saveCharFormData)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setSaveCharFormData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }, [])

  const handleSave = async () => {
    if (
      Object.keys(saveCharFormData).some(
        (key) =>
          saveCharacteristicGridData[key as keyof SaveCharacteristicFormProps]?.required &&
          !String(saveCharFormData[key as keyof SaveCharacteristicFormProps] || '').trim(),
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

    const itemName = createItemName(String(saveCharFormData.nameSrb), String(saveCharFormData.nameEng))
    const saveCharData: SaveCharacteristic = {
      name: itemName,
      description: saveCharFormData.description,
      identifier: !charIdentifier ? saveCharFormData.identifier : undefined,
      value: saveCharFormData.value,
    } as SaveCharacteristic

    try {
      const response = charIdentifier
        ? await updateCharacteristic({ identifier: charIdentifier, char: saveCharData }).unwrap()
        : await createCharacteristic(saveCharData).unwrap()
      const messageCode = `characteristics:${response.message}`

      dispatch(
        setNotification({
          text: t(messageCode),
          type: NotificationType.Success,
        }),
      )
      navigate(`/characteristics`)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `characteristics:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  if (isLoadingCreateChar || isLoadingGetCharacteristicByIdentifier || isLoadingUpdateChar) {
    return <Spinner />
  }

  return (
    <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Grid item sx={{ width: '80%', mb: 2 }}>
        <Typography variant='h4'>
          {charIdentifier
            ? t('characteristics:editChar', { charIdentifier: saveCharFormData.identifier }).toUpperCase()
            : t('characteristics:createCharLabel').toUpperCase()}
        </Typography>
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
