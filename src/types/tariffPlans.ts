import { ItemName, ItemStatus } from './common'

export interface TariffPlan {
  id?: string
  name: ItemName
  identifier: string
  description?: string
  status: ItemStatus
  price: number
  createdByUser: string
  modifiedByUser?: string
  dateCreated?: string
  dateModified?: string
}

export interface TariffPlanCharacteristic {
  id?: string
  tariffPlanId?: string
  characteristicId: string
  value: string
  createdByUser: string
  modifiedByUser?: string
  dateCreated?: string
  dateModified?: string
}

export interface AddTariffPlanCharacteristic {
  tariffPlanId: string
  charId: string
}

export interface SaveTariffPlanDiscount {
  discount: number
  minAmountOfTariffPlans: number
  maxAmountOfTariffPlans: number
  tariffPlanIdentifier: string
}

export interface TariffPlanDiscount {
  id?: string
  discount: string
  minAmountOfTariffPlans: number
  maxAmountOfTariffPlans: number
  tariffPlanId?: string
  createdByUser: string
  modifiedByUser?: string
  dateCreated?: string
  dateModified?: string
}

export interface TariffPlanDiscountResponse {
  tariffPlan: TariffPlanRelationship
  discounts: TariffPlanDiscount[]
}

export interface SaveTariffPlanProps {
  nameSrb: string
  nameEng: string
  identifier: string
  description?: string
  price: number
  status?: ItemStatus | null
}

export interface SaveTariffPlan {
  name: ItemName
  identifier: string
  description?: string
  price: number
  status?: ItemStatus | null
}

export interface TariffPlanCharacteristicResponse {
  tariffPlan: TariffPlanRelationship
  characteristics: TariffPlanCharacteristicChar[]
}

export interface TariffPlanRelationship {
  id: string
  name: ItemName
  identifier: string
}

export interface TariffPlanCharacteristicChar {
  charId: string
  relationId: string
  name: ItemName
  identifier: string
  createdByUser: string
  dateCreated: string
}

export interface TariffPlanCharacteristicsTableProps {
  tariffPlanId: string
  characteristics: TariffPlanCharacteristicChar[]
  isLoading: boolean
}

export interface TariffPlanDiscountsTableProps {
  tariffPlanIdentifier: string
  discounts: TariffPlanDiscount[]
  isLoading: boolean
}
