import React, { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { setAuthData } from './features/auth.slice'
import { CatalogueAppProps } from './types/common'
import { useTranslation } from 'react-i18next'
import './utils/i18n'

const CatalogueApp: React.FC<CatalogueAppProps> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(
      setAuthData({
        ...props,
      }),
    )
  }, [])
  console.log('PP')
  return (
    <>
      <h1>{t('title')}</h1>
    </>
  )
}

export default CatalogueApp
