import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

const CharacteristicsPage = () => {
  return (
    <Grid>
      <Outlet />
    </Grid>
  )
}

export default CharacteristicsPage
