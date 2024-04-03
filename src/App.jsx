
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Products from './pages/Products'
import Compras from './pages/Checkout'
import Details from './components/Details'



function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/checkout' element={<Compras />} />
        <Route path='/details/:id' element={<Details />} />


      </Routes>

    </>
  )
}

export default App
