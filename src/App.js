import './scss/App.scss';
import React from 'react';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { CartContextProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path='/' element={<ItemListContainer greeting="Todos los Productos"/>}/>
      <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos filtrados por categoria"/>}/>
      <Route path='/detail/:productId' element={<ItemDetailContainer />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/about' element={<h1>About</h1>}/>
      <Route path='*' element={<ErrorPage />} />
      </Routes>
      </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
