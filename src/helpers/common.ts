import Cookies from 'js-cookie'
import { AuthState } from '../types/auth'
import { ItemName } from '../types/common'

export const getRoutePrefixFromCodeString = (prefixText: string): string => {
  return prefixText
    .split(/(?=[A-Z])/)
    .map((elem) => elem.toLowerCase())
    .join('-')
}

export const getCurrentUser = (): AuthState | undefined => {
  const cookie = Cookies.get('currentUser')
  return cookie ? (JSON.parse(cookie) as AuthState) : undefined
}

export const createItemName = (name: string, nameEng: string): ItemName => {
  return {
    sr: name,
    en: nameEng,
  } as ItemName
}

export const dateFormatter = (dateString?: string): string => {
  const date = new Date(dateString || '')
  return date.toLocaleString('en-GB', { hour12: false })
}
