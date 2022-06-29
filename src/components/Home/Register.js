import {useState} from 'react';
import { useAuth } from '../../context/authContext';
import {useNavigate} from 'react-router-dom';
import Alert from './Alert';
import {GiTechnoHeart} from "react-icons/gi";

function Register() {


    const [user, setUser] = useState({
        email: '',
        password: '',

    })

    const {signup} = useAuth();
    const navigate =  useNavigate();

    const [error , setError] = useState();


const handleChange = ({target: {name, value}}) => {
    setUser({...user,[name]:value})
}

    const handleSubmit =  async(e) =>{
    e.preventDefault()
    try{
        setError('')
        await signup(user.email , user.password)
        navigate('/products')
    }catch(error){
        if(error.code === "auth/invalid-email"){
            setError("Email Invalido")
        } if(error.code === "auth/weak-password"){
            setError("Debe ingresar una contraseña con mas caracteres")
        }if(error.code ==="auth/email-already-in-use"){
            setError("El Correo ya esta en uso")
        }
        console.log(error.code)
    }
    
    }

    return (
        <div>
        <div className="fondoLogin">
        <div className="logoLogin">
        <GiTechnoHeart size={100} color="white"/>
        <div>
        <h1 className="titulo">Heart Tech</h1>
        </div>
        </div>  
        <div className="loginContenedor">
        {error && <Alert message={error}/>}
        <form onSubmit={handleSubmit}>
        <div className="inputEmail">
        <label htmlFor = "email" > Email </label> 
        <input 
        type = "email"
        name = "email"
        placeholder = "yourEmail@yourCompany.com"
        onChange = {handleChange}
        />
        </div>
        <div className="inputPassword">
        <label htmlFor = "password" > Password </label> 
        <input 
        type = "password"
        name = "password"
        id = "password"
        placeholder = "******"
        onChange = { handleChange}
        />
        </div>  
        
        <div className="botonesLogin">
        <button > Register </button> 
        </div>
        </form>
        </div>
        </div>
        </div>
    )
}

export default Register