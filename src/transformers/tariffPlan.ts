import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { SaveTariffPlanProps, TariffPlan } from '../types/tariffPlans'
import { dateFormatter } from '../helpers/common'

export const getTariffPlanSaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('nameSrb'), key: 'nameSrb' },
  { label: t('nameEng'), key: 'nameEng' },
  { label: t('identifier'), key: 'identifier' },
  { label: t('description'), key: 'description' },
  { label: t('price'), key: 'price' },
]

export const getSaveTariffPlanGridData = (addonData: Partial<SaveTariffPlanProps>): PageElement => ({
  nameSrb: { type: GridFieldTypes.STRING, required: true, value: addonData.nameSrb },
  nameEng: { type: GridFieldTypes.STRING, required: true, value: addonData.nameEng },
  identifier: { type: GridFieldTypes.STRING, required: true, value: addonData.identifier },
  description: { type: GridFieldTypes.AREA, required: false, value: addonData.description },
  price: { type: GridFieldTypes.NUMBER, required: true, value: addonData.price },
})

export const getTariffPlansTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { label: t('identifier'), key: 'identifier' },
  { label: t('nameSrb'), key: 'nameSrb' },
  { label: t('nameEng'), key: 'nameEng' },
  { label: t('price'), key: 'price' },
  { label: t('general:createdBy'), key: 'createdByUser' },
  { label: t('general:modifiedBy'), key: 'modifiedByUser' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const transformTableTariffPlanGridData = (tpData: Partial<TariffPlan>): PageElement => ({
  identifier: {
    value: tpData.identifier,
    link: `/index/tariff-plans/${tpData.identifier}/edit`,
    type: GridFieldTypes.LINK,
  },
  nameSrb: { type: GridFieldTypes.STRING, value: tpData.name?.sr },
  nameEng: { type: GridFieldTypes.STRING, value: tpData.name?.en },
  price: { type: GridFieldTypes.STRING, value: tpData.price },
  createdByUser: { type: GridFieldTypes.STRING, value: tpData.createdByUser },
  modifiedByUser: { type: GridFieldTypes.STRING, value: tpData.modifiedByUser },
  dateCreated: { type: GridFieldTypes.STRING, value: dateFormatter(tpData.dateCreated) },
  dateModified: { type: GridFieldTypes.STRING, value: dateFormatter(tpData.dateModified) },
})
