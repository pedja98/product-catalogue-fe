import { useRoutes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import AddonsPage from '../pages/addons/AddonsPage'
import TariffPlansPage from '../pages/tariffPlans/TariffPlansPage'
import CharacteristicsPage from '../pages/characteristics/CharacteristicsPage'
import NotFoundPage from '../pages/NotFoundPage'

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', index: true, element: <HomePage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'addons', element: <AddonsPage /> },
        { path: 'tariff-plans', element: <TariffPlansPage /> },
        { path: 'characteristics', element: <CharacteristicsPage /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ])

  return routes
}

export default Routes
