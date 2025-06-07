import { Navigate, useRoutes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import AddonsPage from '../pages/addons/AddonsPage'
import TariffPlansPage from '../pages/tariffPlans/TariffPlansPage'
import CharacteristicsPage from '../pages/characteristics/CharacteristicsPage'
import NotFoundPage from '../pages/NotFoundPage'
import CharacteristicsSavePage from '../pages/characteristics/CharacteristicsSavePage'
import CharacteristicsIndexPage from '../pages/characteristics/CharacteristicsIndexPage'
import AddonIndexPage from '../pages/addons/AddonsIndexPage'
import AddonsSavePage from '../pages/addons/AddonsSavePage'
import TariffPlansIndexPage from '../pages/tariffPlans/TariffPlansIndexPage'
import TariffPlansSavePage from '../pages/tariffPlans/TariffPlansSavePage'
import TariffPlansCharacteristicsRelationsPage from '../pages/tariffPlans/TariffPlansCharacteristicsRelationsPage'

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
            { path: 'create', element: <AddonsSavePage /> },
            { path: ':identifier/edit', element: <AddonsSavePage /> },
          ],
        },
        {
          path: 'tariff-plans',
          element: <TariffPlansPage />,
          children: [
            { index: true, element: <TariffPlansIndexPage /> },
            { path: 'create', element: <TariffPlansSavePage /> },
            { path: ':identifier/edit', element: <TariffPlansSavePage /> },
            { path: ':identifier/relations', element: <TariffPlansCharacteristicsRelationsPage /> },
          ],
        },
        {
          path: 'characteristics',
          element: <CharacteristicsPage />,
          children: [
            { index: true, element: <CharacteristicsIndexPage /> },
            { path: 'create', element: <CharacteristicsSavePage /> },
            { path: ':identifier/edit', element: <CharacteristicsSavePage /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ])

  return routes
}

export default Routes
