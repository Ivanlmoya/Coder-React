import ItemCount from '../ItemCount/ItemCount';
import BotonCarrito from '../ItemCount/BotonCarrito/BotonCarrito';

const ItemDetail = ({id , name , img, stock , category,description , price}) => {
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
        <ItemCount stock={stock}/>
        </div>
        <div className="BotonAgregar">
        <BotonCarrito/>
        </div>
        </div>
        </div>
    </div>
    )
}
export default ItemDetail