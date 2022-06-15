import '../../scss/App.scss'
import {useState,useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../../Services/Firebase/index'

const ItemDetailContainer = () => {
    const [product,setProduct] =useState([])  

    const { productId } = useParams()


    useEffect(() => {
    getDoc(doc(db, 'products' , productId)).then(response => {
        const product = {id : response.id, ...response.data()}
        setProduct(product)
    }).catch(error => {
        console.log(error)
    })
    }, [productId])

    return (
        <div className="container">
        <div className="containerDetail">
        <ItemDetail {...product}/>
        </div>
        </div>
    )
}

export default ItemDetailContainer