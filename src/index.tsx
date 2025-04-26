import React from 'react'
import ReactDOM from 'react-dom/client'
import CatalogueApp from './CatalogueApp'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CatalogueApp />
  </React.StrictMode>,
)
