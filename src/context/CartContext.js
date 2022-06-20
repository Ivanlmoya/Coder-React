import { useState, createContext } from "react";

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addItem = (productToAdd) => {

        if(!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
        } else {
            const newCart = cart.map(prod => {
                if(prod.id === productToAdd.id) {
                    const newProduct = {
                        ...prod,
                        count: productToAdd.count
                    }
                    return newProduct
                } else {
                return prod 
                }
            })
            setCart(newCart)
        }
    }
    
    const getCount = () => {
        let accu = 0
        cart.forEach(prod => {
        accu += prod.count
        })
    
        return accu
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const getProduct = (id) => {
        return cart.find(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const newCart = cart.filter(prod => prod.id !== id)
        setCart(newCart)
    }

    const clearAllItem = () => {
        const newCart = []
        setCart(newCart)
        console.log()
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(prod => {
            total += prod.count * prod.price
        })
        return total
    }

  

   
    return(
        <CartContext.Provider value={{ cart, addItem, getCount, getProduct, removeItem, getTotal  ,clearAllItem}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext