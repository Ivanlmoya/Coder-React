import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import {useState , useContext } from 'react';
import CartContext from '../../context/CartContext';
import React from 'react';


const ItemDetail = ({id , name , img, stock , category,description , price}) => {
    
    const [count, setCount] = useState(0)
    const { addItem, getProduct } = useContext(CartContext)


    const Swal = require('sweetalert2')



    const handleOnAdd = (count) =>{
        setCount(count)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Se agrego correctamente al carrito'
          })
    
        addItem({ id, name, price, count: Number(count) , img})
    }
    
  

    
    return(
    <div className="ItemDetailContainer">
    <div className="FirstDetailContainer">
        <div className="LeftDetailContainer">
        <img src={img} className="ImageDetailContainer"></img>
        </div>
    </div>   
        <div className="SecondDetailContainer">
        <div className="RightDetailContainer">
            <p className="parrafo">{name}</p>
            <p className="CodeDetail">Codigo del Producto: {id} / Categoria: {category}</p>
            <p className="DescriptionDetail">Descripcion : {description}</p>
            <p className="PriceDetail">${price}</p>
        </div>
        <div className="BotonCarritoDetail">
        {stock === 0 ? <h1>Sin Stock</h1>:
        <div className="BotonStock">
        { count >= 1  ? <div> <Link to='/cart' className="FinalizarCompra">Finalizar compra</Link> <Link to='/products' className="FinalizarCompra">Seguir Comprando</Link></div>: <ItemCount stock={stock} onAdd={handleOnAdd} initial={getProduct(id)?.count}/>}
        </div>}
        </div>
        </div>
    </div>
    )
}
export default ItemDetail