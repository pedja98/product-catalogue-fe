import { ItemName } from './common'

export interface SaveCharacteristicFormProps {
  nameSrb: string
  nameEng: string
  identifier: string
  value: string
  description: string
}

export interface SaveCharacteristic {
  name: ItemName
  identifier: string
  value: string
  description: string
}

export interface Characteristic {
  id?: string
  name: ItemName
  identifier: string
  value: string
  description?: string
  createdByUser: string
  modifiedByUser?: string
  dateCreated?: string
  dateModified?: string
}
