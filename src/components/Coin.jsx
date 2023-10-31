import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'
import { server } from '../index'
import Error from './Error'
import CoinCard from './CoinCard'


const Coin = () => {

  let [coins,setCoins]=useState([])
  let [loading,setLoading]=useState(true)
  let [error,setError]=useState(false)
  let [page,setPage]=useState(1)
  let [currency,setCurrency]=useState("inr")


  const currencySymbol= currency==="inr" ?  "₹" :currency==="eur" ? "€" : "$"


 let changePage=(page)=>{
  setPage(page);
  setLoading(true)

 }
 let  btns=new Array(132).fill(1)


    useEffect(()=>{
      let fetchCoins=async()=>{
        try {
          let{data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)
        setLoading(false)
        
          
        } catch (error) {
          setError(true)
          setLoading(false)
          
          
        }
      }
      fetchCoins()
    },[currency,page])

    if(error) return <Error message={"Error in featching the Coins data"}/>
  return (
    <Container maxW={'container.xl'}>



{loading ?   <Loader/> :  <>

      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"} >
          <Radio value={"inr"}>INR</Radio>
          <Radio value={"usd"}>USD</Radio>
          <Radio value={"eur"}>EUR</Radio>

        </HStack>

      </RadioGroup>

    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
   {coins.map((i)=>{
    return(
      <CoinCard  id={i.id} price={i.current_price} name={i.name} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} key={i.id}/>
    )
   })}
    </HStack>
    </>
  


}
<HStack width={"full"} overflowX={"auto"} p={"8"} >
  {
    btns.map((item,index)=>{
      return(
      <Button  bgColor={"blackAlpha.900"} color={'white'}  onClick={()=>changePage(index + 1)}>{index+1}</Button>
    )})
  }
      
  </HStack>
  

    </Container>
  )
}

export default Coin

