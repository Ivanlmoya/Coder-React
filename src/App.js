import './scss/App.scss';
import React from 'react';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetail from './components/ItemDetailContainer/ItemDetail';

function App() {
  return (
    <div className="App">
      <header className="navbar"> 
      <NavBar />
      </header>
      <div className="container">
      <ItemListContainer/>
      </div>
    </div>
  );
}

export default App;
