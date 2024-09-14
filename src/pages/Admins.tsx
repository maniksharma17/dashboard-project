import {Box, useTheme} from "@mui/material"
import { useGetAdminsQuery } from "../state/api"
import { DataGrid } from "@mui/x-data-grid"
import Header from "../components/Header"

const Admins = () => {

  const {data, isLoading} = useGetAdminsQuery()
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


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Admin Data" subTitle="View a list of admins with their information." />
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
          rows={data || []}
          columns={columns}
        >

        </DataGrid>
      </Box>
    </Box>
  )
}

export default Admins