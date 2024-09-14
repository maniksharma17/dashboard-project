import {Box, useTheme} from "@mui/material"
import { useGetUserPerformanceQuery } from "../state/api"
import { DataGrid } from "@mui/x-data-grid"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import { RootState } from "../main"

const Admins = () => {

  const userId = useSelector((state: RootState)=>state.global.userId)
  const {data, isLoading} = useGetUserPerformanceQuery(userId)
  const theme = useTheme()

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
      headerName: "# of Products",
      flex: 1,
      renderCell: (params: any)=>{
        return params.value.length
      },
      sortable: false
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.6,
      renderCell: (params: any)=>{
        return `$${Number(params.value).toFixed(2)}`
      }
    },

  ]


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Performance" subTitle="Track your affiliate sales here." />
      <Box height="70vh" width="95%" marginTop="40px"
      sx={{
        "& .MuiDataGrid-virtualScroller": {
            bgcolor: theme.palette.background.paper,
          },
      }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row)=>row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        >

        </DataGrid>
      </Box>
    </Box>
  )
}

export default Admins