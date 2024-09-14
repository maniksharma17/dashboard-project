import {useState} from 'react'
import Header from '../components/Header'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import OverviewChart from '../components/OverviewChart'

const Overview = () => {
  const [view, setView] = useState("units")

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Overview" subTitle="An overview of general profit and revenue."></Header>
      <Box height="70vh"  padding="1rem"
      sx={{
        width: {xs: "200%", lg: "95%"}
      }}
      >
        <FormControl sx={{marginTop: "1rem"}}>
          <InputLabel>View</InputLabel>
          <Select value={view} label="View" onChange={(e)=>{setView(e.target.value)}}>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} isDashboard={false}></OverviewChart>
      </Box>
    </Box>
  )
}

export default Overview