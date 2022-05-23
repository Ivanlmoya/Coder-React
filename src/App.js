import './scss/App.scss';
import React from 'react';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemCount from './components/ItemCount/ItemCount';

function App() {
  return (
    <div className="App">
      <header className="navbar"> 
      <NavBar />
      </header>
      <div className="CardContainer">
      <div className="Card">
      <ItemListContainer greeting="Esta va a ser una Card"/>
      </div>
      </div>
      <div className="itemList">
      <ItemCount/>
      </div>
    </div>
  );
}

export default App;
