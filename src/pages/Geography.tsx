import Header from '../components/Header'
import { Box, useTheme } from '@mui/material'
import { useGetGeographyQuery } from '../state/api'
import {ResponsiveChoropleth} from "@nivo/geo"
import {geoData} from "../state/geoData"

const Geography = () => {

  const theme = useTheme()
  const { data, isLoading } = useGetGeographyQuery()
  console.log("🚀 ~ Geography ~ data:", data)


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subTitle="See your customers on the globe."></Header>
      {!isLoading ? 
        <Box bgcolor={theme.palette.background.paper} color={"#000000"} height="70vh"  mt="40px" border={`1px solid ${theme.palette.secondary.light}`}
        sx={{
          width: {lg: "95%", sm: "100%"}
        }}
        >
          <ResponsiveChoropleth
        data={data}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[ 0, 60 ]}
        colors="nivo"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={140}
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        unknownColor='#dddddd'
        borderWidth={0.5}
        borderColor="#152538"
        
        
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.primary.light,
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.primary.light,
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
        </Box>

      : <>Loading...</>
      }
    </Box>  
  )
}

export default Geography