import './scss/App.scss';
import React from 'react';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import CartWidget from '../src/components/navbar/CartWidget';

function App() {
  return (
    <div className="App">
      <header> 
      <NavBar />
      </header>
      <div className="itemList">
      <CartWidget/>
      <ItemListContainer  greeting="Esta es una Tienda"/>
      </div>
    </div>
  );
}

export default App;
