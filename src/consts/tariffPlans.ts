import { SaveTariffPlanDiscount } from './../types/tariffPlans'
import { SaveTariffPlanProps } from '../types/tariffPlans'

export const SaveTariffPlanFormInitialState: Partial<SaveTariffPlanProps> = {
  nameSrb: '',
  nameEng: '',
  identifier: '',
  description: '',
  price: 0,
}

export const SaveTariffPlanDiscountInitialState: Partial<SaveTariffPlanDiscount> = {
  maxAmountOfTariffPlans: 0,
  minAmountOfTariffPlans: 0,
  discount: 0,
}
