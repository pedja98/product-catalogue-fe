import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { SaveCharacteristicFormProps } from '../types/characteristics'

export const getCharacteristicsSaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('nameSrb'), key: 'nameSrb' },
  { label: t('nameEng'), key: 'nameEng' },
  { label: t('identifier'), key: 'identifier' },
  { label: t('characteristics:value'), key: 'value' },
  { label: t('description'), key: 'description' },
]

export const getSaveCharacteristicGridData = (charData: Partial<SaveCharacteristicFormProps>): PageElement => ({
  nameSrb: { type: GridFieldTypes.STRING, required: true, value: charData.nameSrb },
  nameEng: { type: GridFieldTypes.STRING, required: true, value: charData.nameEng },
  identifier: { type: GridFieldTypes.STRING, required: true, value: charData.identifier },
  value: { type: GridFieldTypes.STRING, required: true, value: charData.value },
  description: { type: GridFieldTypes.AREA, required: false, value: charData.description },
})
