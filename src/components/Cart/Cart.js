import {  useContext } from "react"
import CartContext from "../../context/CartContext"
import { Link } from 'react-router-dom'
import React from 'react';

const Cart = () => {

    const { cart, removeItem ,getTotal, clearAllItemCarrito } = useContext(CartContext)


    return(
        <div >
        <h1 className="CartTitle"> Compras Carrito</h1>
            <div className="CartSuperContainer">
                {cart.map(prod => {
                    return(
                        <div key={prod.id} className="CartContainer">
                            <div className="CartName">{prod.name}</div>
                            <div>Cantidad: {prod.count}</div>
                            <div ><img src={prod.img} className="CartImg"></img></div>
                            <div>Precio x Uni: ${prod.price}</div>
                            <div>Subtotal: ${prod.price * prod.count}</div>
                            <button onClick={() => removeItem(prod.id)} className="CartEliminar">X</button>
                            <div>
                            </div>
                        </div>
                    )})
                }
                <div className="CartContainer">
                <div className="CartName">Total de la compra: ${getTotal()}</div>
                <Link to={'/checkOut'} ><button className="CartEliminar" >Check Out</button></Link>
                <button id="limpiarCarrito"onClick={() => clearAllItemCarrito()}className="CartEliminar" >Eliminar Todo</button>
                </div>
            </div>
        </div>
    )
}

export default Cart