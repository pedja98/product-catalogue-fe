import { Language, UserType } from './auth'

export interface CatalogueAppProps {
  language: Language
  username?: string
  type?: UserType
}
