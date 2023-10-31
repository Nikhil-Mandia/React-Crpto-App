import {createRoot} from "react-dom/client"
import App from "./App"
import { ChakraProvider, theme } from "@chakra-ui/react"
createRoot(document.getElementById("root")).render(

<ChakraProvider theme={theme}>
<App/>
</ChakraProvider>
)


export const server=`https://api.coingecko.com/api/v3`