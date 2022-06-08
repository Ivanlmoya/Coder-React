import { useContext } from "react"
import CartContext from "../../context/CartContext"

const Cart = () => {

    const { cart, removeItem , clearAllItem } = useContext(CartContext)

    return(
        <div >
           <h1 className="CartTitle"> Compras Carrito</h1>
            <div>
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
                            <button onClick={() => clearAllItem(prod.id)}className="CartEliminar" >Eliminar Todo</button>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}

export default Cart