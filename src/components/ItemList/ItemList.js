import Item from "../Item/Item";
import ItemDetail from '../ItemDetailContainer/ItemDetail';
const ItemList = ({products}) => {

    return(
        <div className="SuperContainer">
            <div className="container">
            {products.map(prod=> <Item key={prod.id} {...prod}/>)}
            </div>
            <div className="containerDetail">
            {products.map(prod=> <ItemDetail key={prod.id} {...prod}/>)}
            </div>
            
        </div>
    )
}
export default ItemList