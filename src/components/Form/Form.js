import {useForm} from 'react-hook-form';
import { useState , useContext } from 'react';
import { useNotification } from '../../notification/Notification'
import CartContext from "../../context/CartContext"
import {addDoc,collection, updateDoc, doc , getDocs , query ,where ,documentId, writeBatch} from 'firebase/firestore'
import {db, collectionsName} from '../../Services/Firebase'

const Form = () =>{

    const {register,formState:{errors}, watch, handleSubmit} = useForm();

    const [loading, setLoading] = useState(false)

    const { cart ,getTotal, clearAllItem  } = useContext(CartContext)
    const { setNotification } = useNotification()

    const [order, setOrder] = useState({
        name: '',
        email: '' ,
        phone: '',
        address: ' ',
        comment: ''
    })


    
    const onSubmit = (data) =>{
        setOrder({
            name: data.nombre,
            email: data.email ,
            phone: data.telefono,
            address: data.direccion,
            comment: ''
        })
        setNotification('success',`se creo el siguiente usuario ${data.email}`)
    }

    const createOrder = () => {
        
        const objOrder = {
            buyer: order,
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
            console.log(objOrder)
            if(error.type === 'out_of_stock'){

            }
        }).finally(() => {
            setLoading(false)
        })
    }

    if(loading) {
        return <h1>Cargando...</h1>
    }


    const incluirTelefono = watch('incluirTelefono')

    const edadValidator = (value) => {
        return value >= 18 && value <= 65;
    }

    return (
        <div>
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div>
                <label>Nombre</label>
                <input type='text' {...register('nombre',{
                    required: true,
                    maxLength: 20
                })} />
                {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p>debe tener menos de 20 caracteres</p>}
                </div>
                <div>
                <label>Edad</label>
                <input type='text'  {...register('edad', {
                    validate: {edadValidator}
                })} />
                {errors.edad && <p>la edad debe estar entre 18 y 65</p>}
                </div>
                <div>
                <label>Direccion</label>
                <input type='text' {...register('direccion', {
                    required: true,
                    maxLength: 50
                })} />
                </div>
                <div>
                <label>Email</label>
                <input type='text' {...register('email', {
                    required: true,
                    pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} />
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
                </div>
                <div>
                <label>Pais</label>
                <select {...register('pais')}>
                <option value="ar">Argentina</option>
                <option value="br">Brasil</option>
                <option value="ch">Chile</option>
                </select>
                </div>
                <div>
                    <label>incluir telefono</label>
                    <input type="checkbox" {...register('incluirTelefono')}/>
                </div>
                {incluirTelefono && (
                      <div>
                      <label>telefono</label>
                      <input type="text" {...register('telefono')}/>
                  </div>
                )}
                <input type='submit' value='Enviar'/>
            </form>
            <button onClick={() =>createOrder()}className="CartEliminar" >Crear Orden</button>
        </div>
    )

}

export default Form