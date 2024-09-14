import { Box, useTheme, useMediaQuery } from '@mui/material'
import {ResponsivePie} from "@nivo/pie"
import { useGetSalesQuery } from '../state/api'

const BreakdownChart = ({isDashboard}: {isDashboard: boolean}) => {
  const theme = useTheme()
  const {data, isLoading} = useGetSalesQuery()
  const isMobile = useMediaQuery("(max-width: 700px)");
  if(!data||isLoading) return <>Loading...</>

  const colors = [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.primary.light,
    theme.palette.primary.main,
  ]

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i]
    })
  )

  return (
    <Box 
    height={isDashboard||isMobile? "400px":"100%"}
    width={undefined}
    minHeight={isDashboard? "300px":undefined}
    minWidth={isDashboard? "300px":undefined}
    >
      <ResponsivePie
        theme={{
            "tooltip": {
                "container": {
                    "background": theme.palette.primary.light,
                    "color": theme.palette.primary.dark,
                    "fontSize": 12
                },
            }
        }}
        data={formattedData||[]}
        margin={isDashboard? { top: 40, right: 40, bottom: 80, left: 40 }
            :{ top: 40, right: 40, bottom: 80, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLabels={true}
        enableArcLinkLabels={(isDashboard||isMobile)? false:true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.primary.light}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: isMobile? "column":"row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: isMobile?4:0,
                itemWidth: isDashboard? 80:100,
                itemHeight: 18,
                itemTextColor: theme.palette.primary.light,
                itemDirection: isMobile?'left-to-right':'top-to-bottom',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </Box>
  )
}

export default BreakdownChart