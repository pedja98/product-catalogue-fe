import { FC, useState } from 'react'
import { useGetCharacteristicsQuery } from '../../app/apis/characteristics.api'
import Spinner from '../Spinner'
import { Characteristic } from '../../types/characteristics'
import { ItemName } from '../../types/common'

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../app/hooks'
import { hideConfirm } from '../../features/confirm.slice'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useAddTariffPlanCharacteristicMutation } from '../../app/apis/tariff-plans-characteristics.api'
import { AddTariffPlanCharacteristic } from '../../types/tariffPlans'

const TariffPlanAddCharacteristicDialog: FC<{ tariffPlanId: string }> = ({ tariffPlanId }) => {
  const { isLoading: isGetCharacteristicsLoading, data: chars } = useGetCharacteristicsQuery()
  const [charId, setCharId] = useState('')
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [addTariffPlanCharacteristic, { isLoading: isAddTariffPlanCharacteristicLoading }] =
    useAddTariffPlanCharacteristicMutation()

  if (isGetCharacteristicsLoading || isAddTariffPlanCharacteristicLoading) {
    return <Spinner />
  }

  const charMap: Record<string, ItemName> = (chars || []).reduce(
    (acc: Record<string, ItemName>, curr: Characteristic) => {
      if (curr.id && curr.name) {
        acc[curr.id] = curr.name
      }
      return acc
    },
    {},
  )

  const handleChange = (event: SelectChangeEvent) => {
    setCharId(event.target.value)
  }

  const handleRelationCreate = async () => {
    if (!charId) {
      dispatch(setNotification({ text: t('fillAllRequiredFields'), type: NotificationType.Warning }))
    }

    try {
      const response = await addTariffPlanCharacteristic({
        tariffPlanId,
        charId,
      } as AddTariffPlanCharacteristic).unwrap()
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

  return (
    <Grid sx={{ mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id='characteristic-select-label' required>
          {t('tariffPlans:tariffPlanChar')}
        </InputLabel>
        <Select
          labelId='characteristic-select-label'
          value={charId}
          label={t('tariffPlans:tariffPlanChar')}
          onChange={handleChange}
        >
          {Object.entries(charMap).map(([id, name]) => (
            <MenuItem key={id} value={id}>
              {name.sr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Button sx={{ width: '49%' }} onClick={handleRelationCreate} color='primary' variant='contained'>
          {t('general:add')}
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

export default TariffPlanAddCharacteristicDialog
