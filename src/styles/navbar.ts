import styled from '@emotion/styled'
import { PrimaryThemeColor, SecondaryThemeColor } from '../consts/common'
import { NavLink } from 'react-router-dom'

export const Sidebar = styled.div({
  top: 0,
  left: 0,
  width: '200px',
  minWidth: '100px',
  height: '100vh',
  backgroundColor: PrimaryThemeColor,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
})

export const NavList = styled('ul')(() => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
}))

export const NavItem = styled(NavLink)(() => ({
  padding: '1rem',
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: SecondaryThemeColor,
    cursor: 'pointer',
  },
}))
