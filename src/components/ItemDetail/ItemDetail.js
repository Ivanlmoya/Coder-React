import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import {useState} from 'react';

const ItemDetail = ({id , name , img, stock , category,description , price}) => {
    
    const [count, setCount] = useState(0)

    const HandleOnAdd =(count) =>{
        console.log(count);
        setCount(count)
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
        <div className="BotonStock">
        { count > 0  ? <Link to='/cart' className="FinalizarCompra">Finalizar compra</Link> : <ItemCount stock={stock} onAdd={HandleOnAdd}/>}
        </div>
        </div>
        </div>
    </div>
    )
}
export default ItemDetail