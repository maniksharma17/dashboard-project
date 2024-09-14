export default interface ProductTypes{
  
  _id: string,
  category: string,
  name: string,
  description: string,
  price: number,
  supply: number,
  rating: number,
  
  
  stat: 
    {
      yearlySalesTotal: number,
      yearlyTotalSoldUnits: number,
    }
  
}

