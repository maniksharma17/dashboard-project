import React from 'react'
import { IconButton, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from './FlexBetween';


const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}: any) => {

  React.useEffect(()=>{
    const handler = setTimeout(()=>{
      setSearch(searchInput)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [searchInput, setSearch])


  return (
    <GridToolbarContainer>
      <FlexBetween width="100%" padding="0.5rem">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>

        <TextField
          label="Search..."
          sx={{
            mb: "0.5rem",
            width: "15rem"
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        >
          <IconButton
            onClick={()=>{}}
          >
            <Search />
          </IconButton>

        </TextField>
      </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar