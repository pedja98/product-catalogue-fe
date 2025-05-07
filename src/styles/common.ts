import styled from '@emotion/styled'
import { Button, CircularProgress } from '@mui/material'

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
