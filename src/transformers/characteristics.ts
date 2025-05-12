import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { SaveCharacteristic } from '../types/characteristics'

export const getCharacteristicsSaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('characteristics:name'), key: 'name' },
  { label: t('characteristics:identifire'), key: 'identifire' },
  { label: t('characteristics:value'), key: 'value' },
  { label: t('characteristics:description'), key: 'description' },
]

export const getSaveCharacteristicGridData = (charData: Partial<SaveCharacteristic>): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true, value: charData.name },
  identifire: { type: GridFieldTypes.STRING, required: true, value: charData.identifire },
  value: { type: GridFieldTypes.STRING, required: true, value: charData.value },
  description: { type: GridFieldTypes.AREA, required: false, value: charData.description },
})
