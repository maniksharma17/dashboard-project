import { useGetDashboardQuery } from "../state/api"
import Header from "../components/Header"
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material"
import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import BreakdownChart from "../components/BreakdownChart"
import OverviewChart from "../components/OverviewChart"
import FlexBetween from "../components/FlexBetween"
import StatBox from "../components/StatBox"

const Dashboard = () => {
  const theme = useTheme()
  const {data, isLoading} = useGetDashboardQuery()
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  console.log("🚀 ~ Dashboard ~ data:", data)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1
    },
    {
      field: "products",
      headerName: "Total Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params: any) => {
        return params.value.length
      }
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params: any) => {
        return `$${Number(params.value).toFixed(2)}`
      }
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subTitle="Welcome to your dashboard."/>
        <Box>
          <Button 
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            fontSize: "14px",
            padding: "10px 20px",
            fontWeight: "bold"
          }}
          >
            <DownloadOutlined sx={{mr: "10px"}} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box 
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >

        {/* ROW 1 */}
        <StatBox title="Total Customers" value={data && data.totalCustomers} increase="+14%" description="Since last month" icon={<Email/>}></StatBox>
        <StatBox title="Sales Today" value={data && data.dailyStats.totalSales} increase="+28%" description="2021, Oct 15" icon={<PointOfSale/>}></StatBox>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          p="1rem"
          bgcolor={theme.palette.background.paper}
          borderRadius="0.5rem"
        >
          <OverviewChart view="sales" isDashboard={true}/>
        </Box>

        <StatBox title="Monthly Sales" value={data && data.monthlyStats.totalSales} increase="+5%" description="November" icon={<PersonAdd/>}></StatBox>
        <StatBox title="Yearly Sales" value={data && data.yearlySalesTotal} increase="+44%" description="2021" icon={<Traffic/>}></StatBox>

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          bgcolor={theme.palette.background.paper}
          borderRadius="0.55rem"
        >
          <DataGrid
          columns={columns}
          getRowId={(row)=>row._id}
          loading={isLoading || !data}
          rows={(data && data.latestTransactions)||[]}
          
        >
        </DataGrid>

        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          bgcolor={theme.palette.background.paper}
          borderRadius="0.55rem"
          p="1.5rem"
        > 
          <Typography fontWeight="bold" variant="h5">Sales By Category</Typography>
          <BreakdownChart isDashboard={true}>
          </BreakdownChart>
        </Box>

      </Box>
    </Box>
  )
}

export default Dashboard