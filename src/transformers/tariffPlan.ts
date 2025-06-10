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
    labels.push({ label: t('identifier'), key: 'identifier' })
  }

  labels.push(
    { label: t('nameSrb'), key: 'nameSrb' },
    { label: t('nameEng'), key: 'nameEng' },
    { label: t('description'), key: 'description' },
    { label: t('price'), key: 'price' },
  )

  if (!isCreateMode) {
    labels.push({ label: t('status'), key: 'status' })
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
  { label: t('identifier'), key: 'identifier' },
  { label: t('nameSrb'), key: 'nameSrb' },
  { label: t('nameEng'), key: 'nameEng' },
  { label: t('price'), key: 'price' },
  { label: t('status'), key: 'status' },
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
  status: { type: GridFieldTypes.STRING, value: t(`statuses.${tpData.status}`) },
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

export const getTariffPlanDiscountsTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { label: t('tariffPlans:discount'), key: 'discount' },
  { label: t('tariffPlans:minAmountOfTariffPlans'), key: 'minAmountOfTariffPlans' },
  { label: t('tariffPlans:maxAmountOfTariffPlans'), key: 'maxAmountOfTariffPlans' },
  { label: t('general:createdBy'), key: 'createdByUser' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:modifiedBy'), key: 'modifiedByUser' },
  { label: t('general:dateModified'), key: 'dateModified' },
  { label: t('general:delete'), key: 'delete' },
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
  { label: t('tariffPlans:discount'), key: 'discount' },
  { label: t('tariffPlans:minAmountOfTariffPlans'), key: 'minAmountOfTariffPlans' },
  { label: t('tariffPlans:maxAmountOfTariffPlans'), key: 'maxAmountOfTariffPlans' },
]

export const getSaveTariffPlanDiscountGridData = (discountData: Partial<SaveTariffPlanDiscount>): PageElement => ({
  discount: { type: GridFieldTypes.STRING, value: discountData.discount, required: true },
  minAmountOfTariffPlans: { type: GridFieldTypes.STRING, value: discountData.minAmountOfTariffPlans, required: true },
  maxAmountOfTariffPlans: { type: GridFieldTypes.STRING, value: discountData.maxAmountOfTariffPlans, required: true },
})
