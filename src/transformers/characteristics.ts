import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { Characteristic, SaveCharacteristicFormProps } from '../types/characteristics'
import { dateFormatter } from '../helpers/common'

export const getCharacteristicsSaveLabels = (t: TFunction, includeIdentifier: boolean): GridLabel[] => {
  const labels: GridLabel[] = []

  if (includeIdentifier) {
    labels.push({ text: t('identifier'), key: 'identifier' })
  }

  labels.push(
    { text: t('nameSrb'), key: 'nameSrb' },
    { text: t('nameEng'), key: 'nameEng' },
    { text: t('characteristics:value'), key: 'value' },
    { text: t('description'), key: 'description' },
  )

  return labels
}

export const getSaveCharacteristicGridData = (charData: Partial<SaveCharacteristicFormProps>): PageElement => ({
  nameSrb: { type: GridFieldTypes.STRING, required: true, value: charData.nameSrb },
  nameEng: { type: GridFieldTypes.STRING, required: true, value: charData.nameEng },
  identifier: { type: GridFieldTypes.STRING, required: true, value: charData.identifier },
  value: { type: GridFieldTypes.STRING, required: true, value: charData.value },
  description: { type: GridFieldTypes.AREA, required: false, value: charData.description },
})

export const getCharacteristicsTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('identifier'), key: 'identifier' },
  { text: t('nameSrb'), key: 'nameSrb' },
  { text: t('nameEng'), key: 'nameEng' },
  { text: t('characteristics:value'), key: 'value' },
  { text: t('general:createdBy'), key: 'createdByUser' },
  { text: t('general:modifiedBy'), key: 'modifiedByUser' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const transformTableCharacteristicGridData = (charData: Partial<Characteristic>): PageElement => ({
  identifier: {
    value: charData.identifier,
    link: `/characteristics/${charData.identifier}/edit`,
    type: GridFieldTypes.LINK,
  },
  nameSrb: { type: GridFieldTypes.STRING, value: charData.name?.sr },
  nameEng: { type: GridFieldTypes.STRING, value: charData.name?.en },
  value: { type: GridFieldTypes.STRING, value: charData.value },
  createdByUser: { type: GridFieldTypes.STRING, value: charData.createdByUser },
  modifiedByUser: { type: GridFieldTypes.STRING, value: charData.modifiedByUser },
  dateCreated: { type: GridFieldTypes.STRING, value: dateFormatter(charData.dateCreated) },
  dateModified: { type: GridFieldTypes.STRING, value: dateFormatter(charData.dateModified) },
})
