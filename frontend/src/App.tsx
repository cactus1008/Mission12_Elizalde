import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/CartPage'
import AdminBooks from './pages/AdminBooks'

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/adminbooks' element={<AdminBooks />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
