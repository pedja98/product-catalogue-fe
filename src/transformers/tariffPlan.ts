import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import {
  SaveTariffPlanDiscount,
  SaveTariffPlanProps,
  TariffPlan,
  TariffPlanCharacteristicChar,
  TariffPlanDiscount,
} from '../types/tariffPlans'
import { dateFormatter } from '../helpers/common'

export const getTariffPlanSaveLabels = (t: TFunction, isCreateMode: boolean): GridLabel[] => {
  const labels: GridLabel[] = []

  if (isCreateMode) {
    labels.push({ text: t('identifier'), key: 'identifier' })
  }

  labels.push(
    { text: t('nameSrb'), key: 'nameSrb' },
    { text: t('nameEng'), key: 'nameEng' },
    { text: t('description'), key: 'description' },
    { text: t('price'), key: 'price' },
  )

  if (!isCreateMode) {
    labels.push({ text: t('status'), key: 'status' })
  }

  return labels
}

export const getSaveTariffPlanGridData = (
  tpData: Partial<SaveTariffPlanProps>,
  itemStatusOptions: string[],
  itemStatusOptionsValues: (undefined | string)[],
): PageElement => ({
  nameSrb: { type: GridFieldTypes.STRING, required: true, value: tpData.nameSrb },
  nameEng: { type: GridFieldTypes.STRING, required: true, value: tpData.nameEng },
  identifier: { type: GridFieldTypes.STRING, required: true, value: tpData.identifier },
  description: { type: GridFieldTypes.AREA, required: false, value: tpData.description },
  price: { type: GridFieldTypes.NUMBER, required: true, value: tpData.price },
  status: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: itemStatusOptions,
    optionsValues: itemStatusOptionsValues,
    value: String(tpData.status),
  },
})

export const getTariffPlansTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('identifier'), key: 'identifier' },
  { text: t('nameSrb'), key: 'nameSrb' },
  { text: t('nameEng'), key: 'nameEng' },
  { text: t('price'), key: 'price' },
  { text: t('status'), key: 'status' },
  { text: t('tariffPlans:tariffPlanRelations'), key: 'tariffPlanRelations' },
  { text: t('general:createdBy'), key: 'createdByUser' },
  { text: t('general:modifiedBy'), key: 'modifiedByUser' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
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
  status: { type: GridFieldTypes.STRING, value: t(`statuses.${tpData.status}`) },
  price: { type: GridFieldTypes.STRING, value: tpData.price },
  createdByUser: { type: GridFieldTypes.STRING, value: tpData.createdByUser },
  modifiedByUser: { type: GridFieldTypes.STRING, value: tpData.modifiedByUser },
  dateCreated: { type: GridFieldTypes.STRING, value: dateFormatter(tpData.dateCreated) },
  dateModified: { type: GridFieldTypes.STRING, value: dateFormatter(tpData.dateModified) },
})

export const getTariffPlanCharacteristicsTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('identifier'), key: 'identifier' },
  { text: t('nameSrb'), key: 'nameSrb' },
  { text: t('nameEng'), key: 'nameEng' },
  { text: t('general:createdBy'), key: 'createdByUser' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:delete'), key: 'delete' },
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

export const getTariffPlanDiscountsTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('tariffPlans:discount'), key: 'discount' },
  { text: t('tariffPlans:minAmountOfTariffPlans'), key: 'minAmountOfTariffPlans' },
  { text: t('tariffPlans:maxAmountOfTariffPlans'), key: 'maxAmountOfTariffPlans' },
  { text: t('general:createdBy'), key: 'createdByUser' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:delete'), key: 'delete' },
]

export const transformTableTariffPlanDiscountGridData = (
  discountData: TariffPlanDiscount,
  handleRelationDelete: (id: string) => void,
): PageElement => ({
  discount: { type: GridFieldTypes.STRING, value: discountData.discount },
  minAmountOfTariffPlans: { type: GridFieldTypes.STRING, value: discountData.minAmountOfTariffPlans },
  maxAmountOfTariffPlans: { type: GridFieldTypes.STRING, value: discountData.maxAmountOfTariffPlans },
  createdByUser: { type: GridFieldTypes.STRING, value: discountData.createdByUser },
  dateCreated: { type: GridFieldTypes.STRING, value: dateFormatter(discountData.dateCreated) },
  modifiedByUser: { type: GridFieldTypes.STRING, value: discountData.modifiedByUser },
  dateModified: { type: GridFieldTypes.STRING, value: dateFormatter(discountData.dateModified) },
  delete: { type: GridFieldTypes.BUTTON, handleClick: handleRelationDelete, id: discountData.id },
})

export const getSaveTariffPlanDiscountLabels = (t: TFunction): GridLabel[] => [
  { text: t('tariffPlans:discount'), key: 'discount' },
  { text: t('tariffPlans:minAmountOfTariffPlans'), key: 'minAmountOfTariffPlans' },
  { text: t('tariffPlans:maxAmountOfTariffPlans'), key: 'maxAmountOfTariffPlans' },
]

export const getSaveTariffPlanDiscountGridData = (discountData: Partial<SaveTariffPlanDiscount>): PageElement => ({
  discount: { type: GridFieldTypes.STRING, value: discountData.discount, required: true },
  minAmountOfTariffPlans: { type: GridFieldTypes.STRING, value: discountData.minAmountOfTariffPlans, required: true },
  maxAmountOfTariffPlans: { type: GridFieldTypes.STRING, value: discountData.maxAmountOfTariffPlans, required: true },
})
