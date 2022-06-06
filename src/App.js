import './scss/App.scss';
import React from 'react';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path='/' element={<ItemListContainer greeting="Todos los Productos"/>}/>
      <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos filtrados por categoria"/>}/>
      <Route path='/detail/:productId' element={<ItemDetailContainer />}/>
      <Route path='/cart' element={<h1>Cart</h1>}/>
      <Route path='/about' element={<h1>About</h1>}/>
      <Route path='*' element={<ErrorPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
