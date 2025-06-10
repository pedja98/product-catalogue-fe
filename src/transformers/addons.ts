import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { Addon, SaveAddonProps } from '../types/addons'
import { dateFormatter } from '../helpers/common'

export const getAddonSaveLabels = (t: TFunction, isCreateMode: boolean): GridLabel[] => {
  const labels: GridLabel[] = []

  if (isCreateMode) {
    labels.push({ label: t('identifier'), key: 'identifier' })
  }

  labels.push(
    { label: t('nameSrb'), key: 'nameSrb' },
    { label: t('nameEng'), key: 'nameEng' },
    { label: t('description'), key: 'description' },
    { label: t('price'), key: 'price' },
    { label: t('addons:validFrom'), key: 'validFrom' },
    { label: t('addons:validTo'), key: 'validTo' },
  )

  if (!isCreateMode) {
    labels.push({ label: t('status'), key: 'status' })
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
  { label: t('identifier'), key: 'identifier' },
  { label: t('nameSrb'), key: 'nameSrb' },
  { label: t('nameEng'), key: 'nameEng' },
  { label: t('status'), key: 'status' },
  { label: t('addons:price'), key: 'price' },
  { label: t('general:createdBy'), key: 'createdByUser' },
  { label: t('general:modifiedBy'), key: 'modifiedByUser' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
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
