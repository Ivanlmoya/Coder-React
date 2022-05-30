import ItemCount from '../ItemCount/ItemCount';
import BotonCarrito from '../ItemCount/BotonCarrito/BotonCarrito';

const Item = ({id, name , price,img , stock}) =>{

    return(
        <div className="CardContainer">
        <div className="Card">
        <div className="UpperCard">
        <p>{name}</p>
        </div>
        <div className="MiddleCard">
        <img src={img} className="ImageCard"></img>
        <p>${price}</p>
        </div>
        </div>
        <ItemCount stock={stock}/>
        <BotonCarrito />
        </div>
    )

}

export default Item