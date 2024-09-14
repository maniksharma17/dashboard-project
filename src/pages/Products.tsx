import {useState} from "react"
import { useGetProductsQuery } from "../state/api"
import Header from "../components/Header"
import { Box, Card, CardContent, CardActions, Typography, Button, Collapse, Divider, Rating } from "@mui/material"
import ProductTypes from "../Types/Product"
import {useTheme} from "@mui/material"


const Product = ({
  _id, name, price,description, category, rating, supply, stat
}: ProductTypes) => {
  const theme = useTheme()
  const [ isExpanded, setIsExpanded ] = useState(false)
  
  return (
    <Card>
      <CardContent sx={{padding: "1rem"}}>
        <Typography variant="h5" color={theme.palette.grey[600]} fontWeight="thin">
          {category[0].toUpperCase()+category.slice(1)}
        </Typography>
        <Typography gutterBottom color={theme.palette.primary.light} fontWeight="bold" variant="h3">
          {name}
        </Typography>
        <Typography variant="h4" color={theme.palette.secondary.light} fontWeight="thin">
          ${Number(price).toFixed(2)}
        </Typography>

        <br></br>
        <Divider></Divider>
        <br></br>

        <Typography variant="body1">
          {description}
        </Typography>
        <Rating sx={{margin:"1rem 0rem"}} readOnly value={rating}></Rating>

      </CardContent>

      <CardActions>
        <Button variant="outlined" sx={{
          color: theme.palette.primary.light,
          "&:focus":{
            outline: 'none'
          },
          fontWeight: 600
          
        }}
        size="medium" 
        onClick={()=>{setIsExpanded(!isExpanded)}}
        >
          {(isExpanded)? "Less":"More"}
        </Button>
      </CardActions>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{
        color: theme.palette.primary.light,
        padding: "1rem"
      }}>
        <Typography gutterBottom fontWeight="thin" variant="body1">_id: {_id}</Typography>
        <Typography gutterBottom fontWeight="thin" variant="body1">Supply left: {supply}</Typography>
        <Typography gutterBottom fontWeight="thin" variant="body1">Yearly Sales: {stat.yearlySalesTotal}</Typography>
        <Typography gutterBottom fontWeight="thin" variant="body1">Yearly Units Sold: {stat.yearlyTotalSoldUnits}</Typography>
      </Collapse>
    </Card>
  )
}

const Products = () => {
  const { data, isLoading } = useGetProductsQuery()
  console.log("🚀 ~ Products ~ data:", data)
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subTitle="See a list of all the listed products."></Header>
      {(data || !isLoading) ? 
        <Box 
        mt="20px" 
        display="grid"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          gridTemplateColumns: {
            xs: '1fr',            
            sm: 'repeat(2, 1fr)',              
            md: 'repeat(3, 1fr)',           
            lg: 'repeat(4, 1fr)' 
          }
        }}
        >
          {data.map((product: any) => {
            
            return <Product key={product._doc._id}
            _id={product._doc._id}
            name={product._doc.name}
            price={product._doc.price}
            description={product._doc.description}
            category={product._doc.category}
            rating={product._doc.rating}
            supply={product._doc.supply}
            stat={product.stat[0]}
            ></Product>
          })}
        </Box>
        : <>Loading...</>
      }
    </Box>
)}

export default Products