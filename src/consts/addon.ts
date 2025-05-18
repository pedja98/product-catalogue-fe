import { SaveAddonProps } from '../types/addons'

export const SaveAddonFormInitialState: Partial<SaveAddonProps> = {
  nameSrb: '',
  nameEng: '',
  identifier: '',
  description: '',
  price: 0,
  validFrom: '',
  validTo: '',
}
