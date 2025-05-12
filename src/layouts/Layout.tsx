import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Grid>
        <Navbar />
      </Grid>
      <Grid item sx={{ pl: 2 }}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Layout
