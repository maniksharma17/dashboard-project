import {useMemo} from 'react'
import Header from '../components/Header'
import { Box, useTheme } from '@mui/material'
import { useGetSalesQuery } from '../state/api'
import "react-datepicker/dist/react-datepicker.css"
import { ResponsiveLine } from '@nivo/line'

const Daily = () => {
  const {data} = useGetSalesQuery()
  const theme = useTheme()

  const formattedData = useMemo(()=>{
    if(!data) return []
    const {monthlyData} = data;

    const totalSalesLine: any = {
      id: "totalSales",
      color: theme.palette.primary.light,
      data: []
    }
    const totalUnitsLine: any = {
      id: "totalUnits",
      color: theme.palette.primary.light,
      data: []
    }

    monthlyData.forEach(({month, totalSales, totalUnits}: any) => {
        totalSalesLine.data = [
          ...totalSalesLine.data,
          {x: month, y: totalSales}
        ] 
  
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          {x: month, y: totalUnits}
        ] 
      }
    )
    
    const formattedData = [totalSalesLine, totalUnitsLine]
    return formattedData

  }, [data]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Monthly Sales/Units Overview" subTitle="View a chart of monthly sales and units sold."></Header>
      <Box height="75vh" 
      sx={{
        width: {xs: "200%", lg: "95%"}
      }}
      >
        <ResponsiveLine
            theme={{
              "axis": {
                "ticks": {
                    "line": {
                        "stroke": theme.palette.primary.light,
                        "strokeWidth": 2
                    },
                    "text": {
                        "fontSize": 11,
                        "fill": theme.palette.primary.light,
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    }
                  },
                  "legend": {
                    "text": {
                        "fontSize": 12,
                        "fill": theme.palette.primary.light,
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                      } 
                  }
                },
                "tooltip": {
                      "container": {
                          "background": theme.palette.secondary.light,
                          "color": theme.palette.secondary.dark,
                          "fontSize": 12
                      },
                },
                "grid": {
                    "line": {
                        "stroke": theme.palette.primary.light,
                        "strokeWidth": 0.4
                    }
                },
            }}
            data={formattedData||[]}
            margin={{ top: 50, right: 110, bottom: 60, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            animate={false}
            curve="catmullRom"
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Months',
                legendOffset: 50,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 2,
                tickRotation: 0,
                legend: "Total Sales/Units",
                legendOffset: -50,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            enableGridX={false}
            enableGridY={true}
            pointSize={10}
            pointBorderWidth={2}
            colors={{ scheme: 'dark2' }}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    itemTextColor: theme.palette.primary.light,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
      </Box>
    </Box>
  )
}

export default Daily