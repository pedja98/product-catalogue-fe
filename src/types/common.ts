import { Language, UserType } from './auth'

export interface CatalogueAppProps {
  language: Language
  username?: string
  type?: UserType
}

export enum ModuleOptions {
  Home = 'home',
  Characteristics = 'characteristics',
  TariffPlans = 'tariffPlans',
  Addons = 'addons',
}
