import {useState} from 'react';

const ItemCount = ({stock = 0, initial = 0, onAdd}) => {

    const [count, setCount] = useState(initial)

    const decrement = () => {
        if(count>=1){
        setCount(count - 1)
        }
    }

    const increment = () => {
        if(count<stock)
        {
        setCount(count + 1)
        }
    }

  
    return ( 
        <div className= "Botonera">
        <div className = "botones">
        <button onClick = {decrement}> - </button> 
        </div>
        <p>{count} </p>
        <div className = "botones"> 
        <button onClick = {increment}> + </button> 
        </div>
        <div className = "botones2" > 
        {count >= 1 ? <button onClick={() => onAdd(count)}> Agregar al Carrito </button>
        :<p></p> }
        </div>
        </div>
    )

}

export default ItemCount