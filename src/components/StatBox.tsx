import {Box, Typography, useTheme} from "@mui/material"
import FlexBetween from "./FlexBetween"

const StatBox = ({title, value, increase, icon, description}: any) => {
  const theme = useTheme()

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      padding="1.25rem 1rem"
      flex="1 1 100%"
      bgcolor={theme.palette.background.paper}
      borderRadius="0.5rem"
      color={theme.palette.secondary.light}
    >
      <FlexBetween>
        <Typography variant="h6">{title}</Typography>
        {icon}
      </FlexBetween>

      <Typography variant="h3" fontWeight={600}>{value}</Typography>

      <FlexBetween gap="1rem">
        <Typography variant="h6" fontStyle="italic" sx={{color:"#07ad1a"}}>{increase}</Typography>
        <Typography variant="h6">{description}</Typography>
      </FlexBetween>

    </Box>
  )
}

export default StatBox