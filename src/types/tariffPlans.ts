export interface TariffPlan {
  id?: string
  name: Record<string, string>
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
