import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Navbar />
      <Grid item sx={{ marginLeft: '200px', width: '100%' }}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Layout
