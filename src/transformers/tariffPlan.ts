import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { SaveTariffPlanProps, TariffPlan, TariffPlanCharacteristicChar } from '../types/tariffPlans'
import { dateFormatter } from '../helpers/common'

export const getTariffPlanSaveLabels = (t: TFunction, includeIdentifier: boolean): GridLabel[] => {
  const labels: GridLabel[] = []

  if (includeIdentifier) {
    labels.push({ label: t('identifier'), key: 'identifier' })
  }

  labels.push(
    { label: t('nameSrb'), key: 'nameSrb' },
    { label: t('nameEng'), key: 'nameEng' },
    { label: t('description'), key: 'description' },
    { label: t('price'), key: 'price' },
  )

  return labels
}

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
  { label: t('tariffPlans:tariffPlanRelations'), key: 'tariffPlanRelations' },
  { label: t('general:createdBy'), key: 'createdByUser' },
  { label: t('general:modifiedBy'), key: 'modifiedByUser' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const transformTableTariffPlanGridData = (tpData: Partial<TariffPlan>, t: TFunction): PageElement => ({
  identifier: {
    value: tpData.identifier,
    link: `/tariff-plans/${tpData.identifier}/edit`,
    type: GridFieldTypes.LINK,
  },
  tariffPlanRelations: {
    value: t('tariffPlans:tariffPlanRelations'),
    link: `/tariff-plans/${tpData.identifier}/relations`,
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

export const getTariffPlanCharacteristicsTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { label: t('identifier'), key: 'identifier' },
  { label: t('nameSrb'), key: 'nameSrb' },
  { label: t('nameEng'), key: 'nameEng' },
  { label: t('general:createdBy'), key: 'createdByUser' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:delete'), key: 'delete' },
]

export const transformTableTariffPlanCharacteristicGridData = (
  charData: Partial<TariffPlanCharacteristicChar>,
  handleRelationDelete: (id: string) => void,
): PageElement => ({
  identifier: {
    value: charData.identifier,
    link: `/characteristics/${charData.identifier}/edit`,
    type: GridFieldTypes.LINK,
  },
  nameSrb: { type: GridFieldTypes.STRING, value: charData.name?.sr },
  nameEng: { type: GridFieldTypes.STRING, value: charData.name?.en },
  createdByUser: { type: GridFieldTypes.STRING, value: charData.createdByUser },
  dateCreated: { type: GridFieldTypes.STRING, value: dateFormatter(charData.dateCreated) },
  delete: { type: GridFieldTypes.BUTTON, handleClick: handleRelationDelete, id: charData.relationId },
})
