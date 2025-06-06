import React from 'react'
import ReactDOM from 'react-dom/client'
import CatalogueApp from './CatalogueApp'
import { Language } from './types/auth'
import { Provider } from 'react-redux'
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CatalogueApp language={Language.SR} username={undefined} type={undefined} />
    </Provider>
  </React.StrictMode>,
)
