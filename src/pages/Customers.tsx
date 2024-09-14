import { useGetCustomersQuery } from "../state/api"
import { Box, useTheme } from "@mui/material"
import Header from "../components/Header"
import { DataGrid } from "@mui/x-data-grid"

const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery()
  const theme = useTheme()

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params: any) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
      }
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5
    },

  ]

  if(isLoading) return <>Loading..</>

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers" subTitle="View a list of all the users."></Header>
      <Box height="70vh" width="99%" marginTop="40px" 
        sx={{
          
          "& .MuiDataGrid-root": {
            
          },
          "& .MuiDataGrid-footerContainer": {
            
          },
          "& .MuiDataGrid-cell": {
            borderColor: theme.palette.grey[500]
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.light,
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            bgcolor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: theme.palette.primary.light,
            borderTop: "none"
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row)=>row._id}
          rows={data || []}
          columns={columns}
        ></DataGrid>
      </Box>
    </Box>
  )
}

export default Customers