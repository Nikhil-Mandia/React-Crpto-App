import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Coin from './components/Coin'
import Exchange from './components/Exchange'
import Coindetails from './components/Coindetails'

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/coins' element={<Coin/>}/>
            <Route path='/exchanges' element={<Exchange/>}/>
            <Route path='/coin/:id' element={<Coindetails/>}/>
            

        </Routes>
        
        </BrowserRouter>
      
    </div>
  )
}

export default App
