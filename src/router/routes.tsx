import { Navigate, useRoutes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import AddonsPage from '../pages/addons/AddonsPage'
import TariffPlansPage from '../pages/tariffPlans/TariffPlansPage'
import CharacteristicsPage from '../pages/characteristics/CharacteristicsPage'
import NotFoundPage from '../pages/NotFoundPage'
import CharacteristicsSavePage from '../pages/characteristics/CharacteristicsSavePage'
import CharacteristicsIndexPage from '../pages/characteristics/CharacteristicsIndexPage'
import AddonIndexPage from '../pages/addons/AddonIndexPage'
import AddonSavePage from '../pages/addons/AddonSavePage'

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', index: true, element: <HomePage /> },
        { path: 'home', element: <Navigate to='/' replace /> },
        {
          path: 'addons',
          element: <AddonsPage />,
          children: [
            { index: true, element: <AddonIndexPage /> },
            { path: 'create', element: <AddonSavePage /> },
          ],
        },
        { path: 'tariff-plans', element: <TariffPlansPage /> },
        {
          path: 'characteristics',
          element: <CharacteristicsPage />,
          children: [
            { index: true, element: <CharacteristicsIndexPage /> },
            { path: 'create', element: <CharacteristicsSavePage /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ])

  return routes
}

export default Routes
