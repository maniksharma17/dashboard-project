import { Box } from '@mui/material'
import Header from '../components/Header'
import BreakdownChart from "../components/BreakdownChart"

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subTitle="Breakdown of sales by category"></Header>
      <Box mt="40px" height="75vh" width="90%">
        <BreakdownChart isDashboard={false}/>
      </Box>
    </Box>
  )
}

export default Breakdown