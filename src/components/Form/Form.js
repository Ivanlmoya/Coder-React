import {useForm} from 'react-hook-form';
import { useState } from 'react';

const Form = () =>{

    const {register,formState:{errors}, watch, handleSubmit} = useForm();

    const [order, setOrder] = useState({
        name: '',
        email: '' ,
        phone: '',
        address: ' ',
        comment: ''
    })
    
    const onSubmit = (data) =>{
        setOrder({...data,
            name: data.nombre,
            email: data.email ,
            phone: data.telefono,
            address: data.direccion,
            comment: ''
        })
    
    }
    console.log(order.name)

    const incluirTelefono = watch('incluirTelefono')

    const edadValidator = (value) => {
        return value >= 18 && value <= 65;
    }

    return (
        <div>
            <h2>Formulario</h2>
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
        </div>
    )

}

export default Form