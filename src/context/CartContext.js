import { useState, createContext } from "react";
import React from 'react';
import Swal from 'sweetalert2'


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

    const Swal = require('sweetalert2')
    
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
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: 'se elimino el producto del carrito'
          })
    }

    const clearAllItem = () => {
        const newCart = []
        setCart(newCart)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: 'se eliminaron todos los productos del carrito'
          })
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