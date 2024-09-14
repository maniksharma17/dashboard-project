import {useEffect, useState} from 'react'
import { Box, useTheme } from "@mui/material"
import Header from '../components/Header'
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid"
import { useGetTransactionsQuery } from '../state/api'
import DataGridCustomToolbar from '../components/DataGridCustomToolbar'


const Transactions = () => {
  
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [ sort, setSort ] = useState({})
  const [ search, setSearch ] = useState("")

  useEffect(()=>{
    setPage(0)
    setPageSize(20)
  }, [])

  const [ searchInput, setSearchInput ] = useState("")

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: page,
    pageSize: pageSize,
  });

  const {data, isLoading} = useGetTransactionsQuery({
    ...paginationModel,
    sort: JSON.stringify(sort),
    search
  })
  console.log(data)

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
      <Header title="Transactions" subTitle="View a list of all the transactions." />
      <Box height="70vh" width="99%" marginTop="40px"
        sx={{
          "& .MuiDataGrid-root": {
            
          },
          "& .MuiDataGrid-footerContainer": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderColor: theme.palette.grey[500]
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.light,
            border: "none",
            
          },
          "& .MuiDataGrid-virtualScroller": {
            bgcolor: theme.palette.background.paper,
            border: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: theme.palette.primary.light,
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          columns={columns}
          getRowId={(row)=>row._id}
          loading={isLoading || !data}
          rows={(data && data.transactions)||[]}
          rowCount={(data && data.total)|| 0}
          pagination
          pageSizeOptions={[20,50,100]}
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel)=>{setSort(newSortModel[0])}}
          slots={{
            toolbar: DataGridCustomToolbar
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch}
          }}
        >
        </DataGrid>
      </Box>
    </Box>
  )
}

export default Transactions