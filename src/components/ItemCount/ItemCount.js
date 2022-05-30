import {useState} from 'react';

const ItemCount = ({stock}) => {

    const [count, setCount] = useState(0)

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
        </div>
    )

}

export default ItemCount