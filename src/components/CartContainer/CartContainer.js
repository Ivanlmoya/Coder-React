import { useContext } from "react"
import CartContext from "../../context/CartContext"
import Cart from "../Cart/Cart"
import EmptyCart from "../Cart/EmptyCart"

const CartContainer = () => {

    const { getCount } = useContext(CartContext)
    
    const count = getCount()

    return(
        <div>
        {count > 0 ? <Cart/> : <EmptyCart/>}
        </div>
    )
}

export default CartContainer