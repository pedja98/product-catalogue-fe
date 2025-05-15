export interface Addon {
  id?: string
  name: Record<string, string>
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
