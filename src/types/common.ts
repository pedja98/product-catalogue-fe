import { ChangeEvent } from 'react'
import { Language, UserType } from './auth'
import { Dayjs } from 'dayjs'
import { SelectChangeEvent } from '@mui/material'
import { GridFieldTypes } from '../consts/common'

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

export interface GridLabel {
  label: string
  key: string
}

export interface GridFieldProps {
  gridFieldData: GridFieldAttributes
  label: GridLabel
  handleChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => void
  handleChangeDateTimePicker?: (value: Dayjs | null, name: string) => void
}

export interface GridFieldAttributes<TEnum extends Record<string, string | number> = Record<string, string>> {
  id?: string | number
  value?: string | number
  type: GridFieldType
  link?: string
  options?: (string | number | undefined)[]
  optionsValues?: (string | number | undefined)[]
  required?: boolean
  autocompleteMap?: AutocompleteHashMap
  dialogField?: boolean
  disabled?: boolean
  handleClick?: (id: string) => void
  multiselectValue?: string[]
  multiselectOptions?: Record<EnumValue<TEnum>, string>
  multiselectOptionValues?: TEnum
}

type EnumValue<T extends Record<string, string | number>> = T[keyof T]

export type GridFieldType = (typeof GridFieldTypes)[keyof typeof GridFieldTypes]

export type AutocompleteHashMap = {
  [key: string | number]: unknown
}

export interface PageElement {
  [key: string]: GridFieldAttributes
}

export interface ApiException {
  status: number
  message: string
  error: string
}

export interface ItemName {
  sr: string
  en: string
}

export enum EntityConfirmationDialogOptions {
  TariffPlanAddCharacteristicDialog = 'TariffPlanAddCharacteristicDialog',
  TariffPlanAddDiscountDialog = 'TariffPlanAddDiscountDialog',
}

export interface TableProps {
  columns: GridLabel[]
  rows: PageElement[]
  rowPerPage: number
}

export interface ExpandableTypographyTableProps {
  expanded: boolean
  title: string
  hideActionSection: boolean
  expandableDialogAction: () => void
  isLoading: boolean
  columns: GridLabel[]
  rows: PageElement[]
}
