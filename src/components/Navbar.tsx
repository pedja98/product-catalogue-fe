import { useTranslation } from 'react-i18next'
import { NavItem, NavList, Sidebar } from '../styles/navbar'
import { NavbarLinks } from '../consts/common'
import { getRoutePrefixFromCodeString } from '../helpers/common'

const Navbar: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Sidebar>
      <NavList>
        {NavbarLinks.map((navbarLink, index) => (
          <NavItem key={index} to={`/${getRoutePrefixFromCodeString(navbarLink)}`}>
            {t(`navbar.${navbarLink}`)}
          </NavItem>
        ))}
      </NavList>
    </Sidebar>
  )
}

export default Navbar
