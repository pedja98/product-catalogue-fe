// CatalogueApp.tsx
import React, { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { setAuthData } from './features/auth.slice'
import { CatalogueAppProps } from './types/common'
import './utils/i18n'
import { changeLanguageManually } from './utils/i18n'
import Routes from './router/routes'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import pcTheme from './theme/pcTheme'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { SnackbarProvider } from 'notistack'
import Notification from './components/Notification'
import Confirm from './components/Confirm'

const CatalogueApp: React.FC<CatalogueAppProps> = (props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthData({ ...props }))
    changeLanguageManually(props.language)
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={pcTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
          <Notification />
        </SnackbarProvider>
        <Confirm />
        <HashRouter>
          <Routes />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default CatalogueApp
