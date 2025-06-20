import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { Addon, SaveAddonProps } from '../types/addons'
import { dateFormatter } from '../helpers/common'

export const getAddonSaveLabels = (t: TFunction, isCreateMode: boolean): GridLabel[] => {
  const labels: GridLabel[] = []

  if (isCreateMode) {
    labels.push({ text: t('identifier'), key: 'identifier' })
  }

  labels.push(
    { text: t('nameSrb'), key: 'nameSrb' },
    { text: t('nameEng'), key: 'nameEng' },
    { text: t('description'), key: 'description' },
    { text: t('price'), key: 'price' },
    { text: t('addons:validFrom'), key: 'validFrom' },
    { text: t('addons:validTo'), key: 'validTo' },
  )

  if (!isCreateMode) {
    labels.push({ text: t('status'), key: 'status' })
  }

  return labels
}

export const getSaveAddonGridData = (
  addonData: Partial<SaveAddonProps>,
  itemStatusOptions: string[],
  itemStatusOptionsValues: (undefined | string)[],
): PageElement => ({
  nameSrb: { type: GridFieldTypes.STRING, required: true, value: addonData.nameSrb },
  nameEng: { type: GridFieldTypes.STRING, required: true, value: addonData.nameEng },
  identifier: { type: GridFieldTypes.STRING, required: true, value: addonData.identifier },
  description: { type: GridFieldTypes.AREA, required: false, value: addonData.description },
  price: { type: GridFieldTypes.NUMBER, required: true, value: addonData.price },
  validFrom: { type: GridFieldTypes.DATE_TIME, required: true, value: addonData.validFrom },
  validTo: { type: GridFieldTypes.DATE_TIME, required: false, value: addonData.validTo },
  status: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: itemStatusOptions,
    optionsValues: itemStatusOptionsValues,
    value: String(addonData.status),
  },
})

export const getAddonsTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('identifier'), key: 'identifier' },
  { text: t('nameSrb'), key: 'nameSrb' },
  { text: t('nameEng'), key: 'nameEng' },
  { text: t('status'), key: 'status' },
  { text: t('addons:price'), key: 'price' },
  { text: t('general:createdBy'), key: 'createdByUser' },
  { text: t('general:modifiedBy'), key: 'modifiedByUser' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const transformTableAddonGridData = (addonData: Partial<Addon>, t: TFunction): PageElement => ({
  identifier: {
    value: addonData.identifier,
    link: `/addons/${addonData.identifier}/edit`,
    type: GridFieldTypes.LINK,
  },
  nameSrb: { type: GridFieldTypes.STRING, value: addonData.name?.sr },
  nameEng: { type: GridFieldTypes.STRING, value: addonData.name?.en },
  status: { type: GridFieldTypes.STRING, value: t(`statuses.${addonData.status}`) },
  price: { type: GridFieldTypes.STRING, value: addonData.price },
  createdByUser: { type: GridFieldTypes.STRING, value: addonData.createdByUser },
  modifiedByUser: { type: GridFieldTypes.STRING, value: addonData.modifiedByUser },
  dateCreated: { type: GridFieldTypes.STRING, value: dateFormatter(addonData.dateCreated) },
  dateModified: { type: GridFieldTypes.STRING, value: dateFormatter(addonData.dateModified) },
})
