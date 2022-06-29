import './scss/App.scss';
import React from 'react';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { CartContextProvider } from './context/CartContext';
import CartContainer from './components/CartContainer/CartContainer';
import { NotificationProvider } from './notification/Notification';
import Form from './components/Form/Form'
import Home from './components/Home/Home';
import Login from './components/Home/Login';
import Register from './components/Home/Register';
import AuthContextProvider from './context/authContext';
import ProtectedRoute from './components/Home/ProtectedRoute'


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
      <CartContextProvider>
      <NotificationProvider>
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path='/' element={
        <ProtectedRoute>
      <Login />
      </ProtectedRoute>
      }/>
      <Route path='/login' element={<Login />}/>
      <Route path='/Register' element={<Register />}/>
      <Route path='/products' element={<ProtectedRoute><ItemListContainer /></ProtectedRoute>}/>
      <Route path='/category/:categoryId' element={<ProtectedRoute><ItemListContainer /></ProtectedRoute>}/>
      <Route path='/detail/:productId' element={<ProtectedRoute><ItemDetailContainer /></ProtectedRoute>}/>
      <Route path='/cart' element={<ProtectedRoute><CartContainer /></ProtectedRoute>}/>
      <Route path='/checkOut' element={<ProtectedRoute><Form /></ProtectedRoute>}/>
      <Route path='*' element={<ErrorPage />} />
      </Routes>
      </BrowserRouter>
      </NotificationProvider>
      </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
