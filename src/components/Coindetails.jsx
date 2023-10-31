import { Box, Container, HStack, Radio, RadioGroup, VStack,Text ,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import { server } from '../index'
import { useParams } from 'react-router-dom'
import Error from './Error'
import CustomBar from './CustomBar'
import Item from './Item'
import Chart from './Chart'


const Coindetails = () => {



  
  let [coin,setCoin]=useState([])
  let [loading,setLoading]=useState(true)
  let [error,setError]=useState(false)
  let [currency,setCurrency]=useState("inr")
  let [days,setDays]=useState("24h")
  let [chartArray,setChartArray]=useState([])

  

  let params=useParams();

  const currencySymbol= currency==="inr" ?  "₹" :currency==="eur" ? "€" : "$"

  useEffect(()=>{
    let fetchCoins=async()=>{
      try {
        let{data}=await axios.get(`${server}/coins/${params.id}`)
        let{data:chartData}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

      
      setCoin(data)
      setChartArray(chartData.prices)

      setLoading(false)
      
        
      } catch (error) {
        setError(true)
        setLoading(false)
        
        
      }
    }
    fetchCoins()
  },[params.id])

  if(error) return <Error message={"Error in featching the Coin data"}/>

  return (
    
      <Container maxW={"container.xl"}>
        {loading? <Loader/>:
        
        
        <>
        <Box borderWidth={1} w={"full"}>
        <Chart arr={chartArray} currency={currencySymbol} days={days}/>
        

        </Box>
        {/* {button} */}

        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"} >
          <Radio value={"inr"}>INR</Radio>
          <Radio value={"usd"}>USD</Radio>
          <Radio value={"eur"}>EUR</Radio>

        </HStack>


      </RadioGroup>

      <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>Last update on {Date(coin.market_data.last_updated).split("G")[0]} </Text>
        <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"}/>


      <Stat>
        <StatLabel>{coin.name}</StatLabel>
        <StatNumber> {currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
        <StatHelpText><StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase":"decrease"}/>{coin.market_data.price_change_percentage_24h}%  </StatHelpText>

      </Stat>
      <Badge fontSize={"2xl"} bgColor={"blackAlpha.400"} color={"white"}>{`#${coin.market_cap_rank}`}</Badge>
      <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
      <Box w={"full"} p={"4"}>
        <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
        <Item title={"Circulating  Supply"} value={coin.market_data.circulating_supply}/>
        <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
        <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
        <Item title={"All Time High "} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
        




      </Box>

      </VStack>

        
        
        
        </>
        } 





      </Container>
      
      
  
  )
}

export default Coindetails
