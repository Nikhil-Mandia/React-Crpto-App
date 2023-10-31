import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Image from './Image'

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"}  w={"full"} h={"85vh"}>
      <Image w={"full"} h={"full"} objectFit={"container"} src={""}/>
      <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.700"} mt={""}>Crypto</Text>

    </Box>
  )
}

export default Home
