import '../../scss/App.scss'
import { getProducts } from "../CustomFetch/CustomFetch";
import {useState,useEffect} from 'react';
import ItemList from '../ItemList/ItemList';


const ItemListContainer = () => {
    const [products,setProducts] =useState([])  

    useEffect(()=>{
        getProducts().then(response => {
            setProducts(response)
        })
    },[])

    return (
        <ItemList products={products}/>  
    )
}

export default ItemListContainer