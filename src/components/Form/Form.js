import {useForm} from 'react-hook-form';
import { useState , useContext } from 'react';
import React  from 'react';
import CartContext from "../../context/CartContext"
import {addDoc,collection, updateDoc, doc , getDocs , query ,where ,documentId, writeBatch} from 'firebase/firestore'
import {db, collectionsName} from '../../Services/Firebase'
import { useAuth } from '../../context/authContext';
import Swal from 'sweetalert2'


const Form = () =>{

    const {register,formState:{errors}, handleSubmit} = useForm();

    const [loading, setLoading] = useState(false)
    const [ActualizarDatos, setActualizarDatos] = useState(true)

    const { cart ,getTotal, clearAllItem  } = useContext(CartContext)

    const Swal = require('sweetalert2')

    const [order, setOrder] = useState({
        name: '',
        email: '' ,
        phone: '',
        address: ' ',
        comment: ''
    })

    const {user} = useAuth();


    const sendCustomEmail = async(order , id , cart) =>{

        const collectionRef = collection(db,'email')

        const emailContent ={
        to: user.email,
        message: {
        subject:  `Has realizado la compra con orden ${id} `,
        text: `Estimado ${user.displayName} , gracias por tu compra !`,
        html: '',
    }

    }

        return await addDoc(collectionRef,emailContent)

    }

    
    const onSubmit = (data) =>{

        setOrder({
            name: data.nombre,
            email: data.email ,
            phone: data.telefono,
            address: data.direccion,
            comment: ''
        })
        setActualizarDatos(false)
    }
    
    const createOrder = () => {

        
        const objOrder = {
            buyer: order,
            items: cart ,
            total: getTotal()        
        }
        console.log(objOrder)
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
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: `El numero de la orden es ${id} , se enviara un mail a ${order.email} , con el detalle de la compra`
              })
              sendCustomEmail(order , id ,cart)
            clearAllItem()
        }).catch(error =>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: `Algunos items seleccionados no tienen Stock`
              })
            console.log(objOrder)
            if(error.type === 'out_of_stock'){

            }
        }).finally(() => {
            setLoading(false)
            setActualizarDatos(true)
        })
    }

    if(loading) {
        return <h1>Cargando...</h1>
    }


    const edadValidator = (value) => {
        return value >= 18 && value <= 65;
    }

    return (
        <div className="containerForm">
            <h2 className="tituloForm">Check Out</h2> 
            <form onSubmit={handleSubmit(onSubmit)} className="formContainer"> 
                <div className="inputNameOrder">
                <label>Nombre</label>
                <input type='text' {...register('nombre',{
                    required: true,
                    maxLength: 20
                })} />
                {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p>debe tener menos de 20 caracteres</p>}
                </div>
                <div className="inputEdadOrder">
                <label>Edad</label>
                <input type='text'  {...register('edad', {
                    validate: {edadValidator}
                })} />
                {errors.edad && <p>la edad debe estar entre 18 y 65</p>}
                </div>
                <div className="inputDireccionOrder">
                <label>Direccion</label>
                <input type='text' {...register('direccion', {
                    required: true,
                    maxLength: 50
                })} />
                </div>
                <div className="inputEmailOrder">
                <label>Email</label>
                <input type='text' {...register('email', {
                    required: true,
                    pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} />
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
                </div>
                <div className="inputPaisOrder">
                <label>Pais</label>
                <select {...register('pais')}>
                <option value="ar">Argentina</option>
                <option value="br">Brasil</option>
                <option value="ch">Chile</option>
                </select>
                </div>
                <div className="inputTelefonoOrder">
                <label>Telefono</label>
                <input type="text" {...register('telefono')}/>
                </div>  
              { ActualizarDatos?  <input type='submit' value='Actualizar Datos' className="inputButtonOrder"/> :
                <input type='submit' value='Enviar Pedido' onClick={()=>createOrder()} className="inputButtonOrder"/> }
            </form>     
                
        </div>
    )

}

export default Form