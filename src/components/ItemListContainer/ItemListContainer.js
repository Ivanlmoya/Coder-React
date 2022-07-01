import '../../scss/App.scss'
import React from 'react';
import {useState,useEffect} from 'react';
import ItemList from '../ItemList/ItemList';
import{useParams} from 'react-router-dom';
import {getDocs,collection , query, where } from 'firebase/firestore' ;
import {db} from '../../Services/Firebase/index';


const ItemListContainer = () => {
    const [products,setProducts] =useState([])  
    const { categoryId } = useParams()

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const collectionRef = categoryId
        ? query(collection(db,'products'),where('category','==',categoryId))
        :collection(db,'products')

    getDocs(collectionRef).then(response =>{
        const products = response.docs.map(doc =>{
            return{id:doc.id, ...doc.data()}
        })
        setProducts(products)
    }).catch(error => {
        console.log(error)
    }).finally(() => {
        setLoading(false)
    })
    }, [categoryId])


    if(loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <ItemList products={products}/>  
    )
}

export default ItemListContainer