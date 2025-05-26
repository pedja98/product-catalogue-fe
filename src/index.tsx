import React from 'react'
import ReactDOM from 'react-dom/client'
import CatalogueApp from './CatalogueApp'
import { Language } from './types/auth'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CatalogueApp language={Language.SR} username={undefined} type={undefined} />
  </React.StrictMode>,
)
