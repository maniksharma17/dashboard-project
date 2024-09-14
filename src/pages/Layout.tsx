import {useState} from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useGetUserQuery } from '../state/api'
import { RootState } from '../main'


const Layout = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const userId = useSelector((state: RootState)=>state.global.userId)
  const { data } = useGetUserQuery(userId)  

  return (
    <Box sx={{
      display: {xs: 'block', md: 'flex'},
      width: '100vw',
      height: '100vh'
    }}
    >
      <Sidebar
        user={data || {}}
        drawerWidth={'260px'}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar>

      <Box flexGrow={1}>
        <Navbar 
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout