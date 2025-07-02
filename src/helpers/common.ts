import Cookies from 'js-cookie'
import { AuthState, Language } from '../types/auth'
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

export const getCurrentUserLanguage = (): string => {
  const currentUser = JSON.parse(String(Cookies.get('currentUser'))) as AuthState
  return currentUser.language.toLocaleLowerCase() || Language.SR.toLocaleLowerCase()
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

export const checkIfTimeDiffIsMoreThen12h = (dateString?: string): boolean => {
  const givenDate = new Date(String(dateString))
  const now = new Date()
  const differenceInMs = Math.abs(now.getTime() - givenDate.getTime())
  const twelveHoursInMs = 12 * 60 * 60 * 1000
  return differenceInMs > twelveHoursInMs
}
