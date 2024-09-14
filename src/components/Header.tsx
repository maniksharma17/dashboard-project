import { Typography, Box, useTheme } from '@mui/material'

const Header = ({title, subTitle}: {title: string, subTitle: string}) => {

  const theme = useTheme()

  return <Box>
      <Typography variant="h2" color={theme.palette.primary.light} fontWeight="bold" marginBottom="5px">{title}</Typography>
      <Typography variant="h5" color={theme.palette.secondary.light} fontWeight="thin" marginBottom="5px">{subTitle}</Typography>
    </Box>
}

export default Header