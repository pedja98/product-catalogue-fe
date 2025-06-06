import { ItemName } from './common'

export interface TariffPlan {
  id?: string
  name: ItemName
  identifier: string
  description?: string
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

export interface SaveTariffPlanProps {
  nameSrb: string
  nameEng: string
  identifier: string
  description?: string
  price: number
}

export interface SaveTariffPlan {
  name: ItemName
  identifier: string
  description?: string
  price: number
}

export interface TariffPlanCharacteristicResponse {
  id: string
  tariffPlan: TariffPlanCharacteristicTariffPlan
  characteristics: TariffPlanCharacteristicChar[]
}

export interface TariffPlanCharacteristicTariffPlan {
  id: string
  name: {
    en: string
    sr: string
  }
  identifier: string
  description: string
  price: number
  createdByUser: string
  modifiedByUser?: string
  dateCreated: string
  dateModified: string
}

export interface TariffPlanCharacteristicChar {
  id: string
  name: {
    en: string
    sr: string
  }
  identifier: string
  createdByUser: string
  modifiedByUser?: string
  dateCreated: string
  dateModified: string
}
