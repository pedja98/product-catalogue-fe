import { useTranslation } from 'react-i18next'
import { Button, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'
import { SaveCharacteristic } from '../../types/characteristics'
import { SaveCharFormInitialState } from '../../consts/characteristics'
import { getCharacteristicsSaveLabels, getSaveCharacteristicGridData } from '../../transformers/characteristics'
import GridField from '../../components/GridField'

const CharacteristicsSavePage = () => {
  const { t } = useTranslation()
  const [charData, setCharData] = useState<Partial<SaveCharacteristic>>(SaveCharFormInitialState)

  const labels = getCharacteristicsSaveLabels(t)
  const saveCharacteristicGridData = getSaveCharacteristicGridData(charData)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target
    setCharData((prevData) => ({
      ...prevData,
      [name]: isNaN(Number(value)) || !value ? value : Number(value),
    }))
  }, [])

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
          <Button variant='contained' sx={{ width: '100%' }}>
            {t('general:saveButtonLabel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CharacteristicsSavePage
