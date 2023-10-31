import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, HStack } from '@chakra-ui/react'
import Loader from './Loader'
import { server } from '../index'
import ExchangeCard from './ExchangeCard'
import Error from './Error'


const Exchange = () => {

  let [exchanges,setExchanges]=useState([])
  let [loading,setLoading]=useState(true)
  let [error,setError]=useState(false)
  



    useEffect(()=>{
      let fetchExchanges=async()=>{
        try {
          let{data}=await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setLoading(false)
       
          
        } catch (error) {
          setError(true)
          setLoading(false)
          
          
        }
      }
      fetchExchanges()
    },[])

    if(error) return <Error message={"Error in featching the data"}/>
  return (
    <Container maxW={'container.xl'}>

{loading ?   <Loader/> :  

    <HStack justifyContent={"space-evenly"} wrap={"wrap"}>
   {exchanges.map((i)=>{
    return(
      <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id}/>
    )
   })}
    </HStack>


}

    </Container>
  )
}

export default Exchange
