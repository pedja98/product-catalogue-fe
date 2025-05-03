import React from 'react'
import ReactDOM from 'react-dom/client'
import './utils/i18n'
import CatalogueApp from './CatalogueApp'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Language } from './types/auth'
import Notification from './components/Notification'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
        <Notification />
      </SnackbarProvider>
      <CatalogueApp language={Language.SR} username={undefined} type={undefined} />
    </Provider>
  </React.StrictMode>,
)
