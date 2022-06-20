import { useState, useContext } from "react"
import CartContext from "../../context/CartContext"
import {addDoc,collection, updateDoc, doc , getDocs , query ,where ,documentId, writeBatch} from 'firebase/firestore'
import {db, collectionsName} from '../../Services/Firebase'
import { useNotification } from '../../notification/Notification'
import { Link } from 'react-router-dom'

const Cart = () => {

    const [loading, setLoading] = useState(false)

    const { cart, removeItem ,getTotal, clearAllItem } = useContext(CartContext)

    const { setNotification } = useNotification()

    const [order, setOrder] = useState()


    const createOrder = () => {
        
        const objOrder = {
            buyer:{
                name: order.name,
                email: order.email ,
                phone: order.phone,
                address: order.address,
                comment:''
            },
            items: cart ,
            total: getTotal()        
        }

        const ids = cart.map(prod => prod.id)

        const batch = writeBatch(db)

        const outOfStock = []

        const collectionIdRef = collection(db,'products')
        getDocs(query(collectionIdRef , where(documentId(),'in',ids)))
        .then(response =>{
            response.docs.forEach(doc =>{
                const dataDoc = doc.data()
                const prodCount = cart.find(prod => prod.id === doc.id)?.count
                if(dataDoc.stock >= prodCount){
                    batch.update(doc.ref,{stock: dataDoc.stock - prodCount})
                } else{
                    outOfStock.push({id: doc.id , ...dataDoc})
                }
            })
        }).then (()=>{
            if(outOfStock.length === 0){
                const collectRef = collection(db, collectionsName.orders)
                return addDoc(collectRef , objOrder)
            } else{
                return Promise.reject({type: 'out_of_stock', products:outOfStock})
            }
        }).then(({id})=>{
            batch.commit()
            setNotification('success',`El id de la orden es: ${id}`)
            console.log(objOrder)
            
            clearAllItem()
        }).catch(error =>{
            setNotification('error',`Algunos productos no tienen stock`)
            if(error.type === 'out_of_stock'){

            }
        }).finally(() => {
            setLoading(false)
        })
    }

    if(loading) {
        return <h1>Generando orden...</h1>
    }

  /*   const updateDocument = () =>{
        const id = cart[0].id
        const docRef = doc(db,'products',id)
        updateDoc(docRef,{stock:10})
    } */

    return(
        <div >
        <h1 className="CartTitle"> Compras Carrito</h1>
            <div>
                {cart.map(prod => {
                    return(
                        <div key={prod.id} className="CartContainer">
                            <div className="CartName">{prod.name}</div>
                            <div>Cantidad: {prod.count}</div>
                            <div ><img src={prod.img} className="CartImg"></img></div>
                            <div>Precio x Uni: ${prod.price}</div>
                            <div>Subtotal: ${prod.price * prod.count}</div>
                            <button onClick={() => removeItem(prod.id)} className="CartEliminar">X</button>
                            <div>
                            </div>
                        </div>
                    )})
                }
                <div className="CartContainer">
                <div className="CartName">Total de la compra: ${getTotal()}</div>
                <button onClick={() =>createOrder()}className="CartEliminar" >Crear Orden</button>
                <Link to={'/checkOut'} ><button className="CartEliminar" >Check Out</button></Link>
                <button onClick={() => clearAllItem()}className="CartEliminar" >Eliminar Todo</button>
                </div>
            </div>
        </div>
    )
}

export default Cart