import '../../scss/App.scss'
import {useState,useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import {getProductsById} from '../CustomFetch/CustomFetch'


const ItemDetailContainer = () => {
    const [product,setProduct] =useState([])  

    const { productId } = useParams()


    useEffect(() => {
        getProductsById(productId).then(response => {
            setProduct(response)
        })
    }, [])

    return (
        <div className="container">
        <div className="containerDetail">
        <ItemDetail {...product}/>
        </div>
        </div>
    )
}

export default ItemDetailContainer