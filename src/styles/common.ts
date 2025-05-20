import styled from '@emotion/styled'
import { Button, CircularProgress } from '@mui/material'
import { SecondaryThemeColor } from '../consts/common'
import { Link } from 'react-router-dom'

export const CenteredCircularProgress = styled(CircularProgress)({
  width: '80px !important',
  height: '80px !important',
  color: 'black !important',
})

export const Root = styled.div({
  width: '100%',
  textAlign: 'center',
})

export const ButtonStyled = styled(Button)(() => ({
  margin: '30',
  padding: '10',
  minWidth: 250,
  height: 35,
}))

export const TableLinkStyled = styled(Link)(() => ({
  color: 'black',
  textDecoration: 'none',
  fontSize: '1rem !important',
  '&:hover': {
    color: SecondaryThemeColor,
  },
}))
