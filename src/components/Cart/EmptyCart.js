import { Link } from 'react-router-dom';
import React from 'react';

const EmptyCart = () => {


    return(
        <div className="EmptyCartContainer">
        <h1 className="EmptyCarrito">Carrito Vacio</h1>
        <p className="EmptyParrafo">No tienes productos para comprar</p>
        <Link to={'/products'} > <p className="ButtonProduct">ver los productos</p></Link>
        </div>
    )
}

export default EmptyCart