import {useState} from 'react';

const ItemCount = () => {

    const [count, setCount] = useState(0)

    const decrement = () => {
        setCount(count - 1)
    }

    const increment = () => {
        setCount(count + 1)
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
        </div>
    )

}

export default ItemCount