import React from 'react'
import {ResponsiveLine} from "@nivo/line"
import { useTheme } from '@mui/material'
import { useGetSalesQuery } from '../state/api'

const OverviewChart = ({isDashboard = false, view}: {isDashboard: boolean, view: string}) => {

  const theme = useTheme()
  const {data, isLoading} = useGetSalesQuery()

  const [totalSalesLine, totalUnitsLine]: any = React.useMemo(()=>{

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

    monthlyData.reduce((acc: any, {month, totalSales, totalUnits}: any)=>{
      const currentSales = acc.sales + totalSales
      const currentUnits = acc.units + totalUnits

      totalSalesLine.data = [
        ...totalSalesLine.data,
        {x: isDashboard? month.substring(0, 3):month, y: currentSales}
      ] 

      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        {x: month, y: currentUnits}
      ] 

      return {sales: currentSales, units: currentUnits}

    }, {sales: 0, units: 0})

    return [[totalSalesLine], [totalUnitsLine]]

  }, [data, theme, isDashboard])

  if(isLoading) return <>Loading...</>
  return (
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
                    "stroke": theme.palette.grey[500],
                    "strokeWidth": 0.5
                }
            },
        }}
        data={view=="sales"? totalSalesLine:totalUnitsLine}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Months',
            legendOffset: 40,
            legendPosition: 'middle',
            truncateTickAt: 0,
            
        }}
        axisLeft={{
            tickValues: 5,
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard? "" : view=="sales"? "Total Sales": "Total Units Sold",
            legendOffset: -55,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableArea={isDashboard}
        enableGridX={true}
        enableGridY={true}
        pointSize={10}
        pointBorderWidth={2}
        curve="catmullRom"
        animate={false}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        colors={{ scheme: 'dark2' }}
        useMesh={true}
        
        legends={[
            {
                anchor: 'bottom-right',
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
  )
}

export default OverviewChart