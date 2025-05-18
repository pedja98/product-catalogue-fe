import { ItemName } from './common'

export interface Addon {
  id?: string
  name: ItemName
  identifier: string
  description?: string
  price: number
  validFrom: string
  validTo?: string
  createdByUser: string
  modifiedByUser?: string
  dateCreated?: string
  dateModified?: string
}

export interface SaveAddonProps {
  nameSrb: string
  nameEng: string
  identifier: string
  description?: string
  price: number
  validFrom: string
  validTo?: string
}

export interface SaveAddon {
  name: ItemName
  identifier: string
  description?: string
  price: number
  validFrom: string
  validTo?: string
}
