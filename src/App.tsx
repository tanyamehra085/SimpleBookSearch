
import './App.css'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import AddBook from './pages/AddBook'
import './App.css'
import EditBook from './pages/EditBook'
import {Toaster} from 'react-hot-toast'


function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster/>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Hero/>} />
        <Route path='/search' element={<SearchPage/>} />
        <Route path='/addbook' element={<AddBook/>} />
        <Route path='/edit/:id' element={<EditBook/>} />
      
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
