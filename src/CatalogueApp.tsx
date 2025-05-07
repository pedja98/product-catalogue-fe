// CatalogueApp.tsx
import React, { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { setAuthData } from './features/auth.slice'
import { CatalogueAppProps } from './types/common'
import './utils/i18n'
import { changeLanguageManually } from './utils/i18n'
import Routes from './router/routes'
import { HashRouter } from 'react-router-dom'

const CatalogueApp: React.FC<CatalogueAppProps> = (props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthData({ ...props }))
    changeLanguageManually(props.language)
  }, [])

  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  )
}

export default CatalogueApp
