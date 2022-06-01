import '../../scss/App.scss'
import { getProducts } from "../CustomFetch/CustomFetch";
import {useState,useEffect} from 'react';
import ItemList from '../ItemList/ItemList';
import{useParams} from 'react-router-dom';
import {getProductsByCategory} from '../CustomFetch/CustomFetch';

const ItemListContainer = () => {
    const [products,setProducts] =useState([])  
    const { categoryId } = useParams()
    
    useEffect(() => {
        if(!categoryId) {
            getProducts().then(response => {
                setProducts(response)
            })
        } else {
            getProductsByCategory(categoryId).then(response => {
                setProducts(response)
            })
        }
    }, [categoryId])

    return (
        <ItemList products={products}/>  
    )
}

export default ItemListContainer