import {useState} from 'react';
import { useAuth } from '../../context/authContext';
import {useNavigate} from 'react-router-dom';
import Alert from './Alert';
import {GiTechnoHeart} from "react-icons/gi";
import { Link } from 'react-router-dom';


function Login() {


    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const {login , loginWithGoogle, resetPassword}  = useAuth();
    const navigate =  useNavigate();

    const [error , setError] = useState();


const handleChange = ({target: {name, value}}) => {
    setUser({...user,[name]:value})
}

    const handleSubmit =  async(e) =>{
    e.preventDefault()
    try{
        setError('')
        await login(user.email , user.password)
        navigate('/')
    }catch(error){
        if(error.code === "auth/user-not-found"){
            setError("No se encuentra el Usuario")
        } if(error.code === "auth/wrong-password"){
            setError("Contraseña Incorrecta")
        }if(error.code ==="auth/email-already-in-use"){
            setError("El Correo ya esta en uso")
        }
        console.log(error.code)
    }
    
    }



    const handleGoogleSignIn = async () =>{
        try{
         await  loginWithGoogle() 
         navigate('/products')
        }catch(error){
            setError(error.message)
        }
      }

      /* hacer un componente nuevo para reseteo de pass */

     const handleResetPassword = async() =>{
        if(!user.email) return setError('Ingresa tu Email')
        try{
            await resetPassword(user.email)
            setError('we sent you a email with password reset')
        } catch (error) {
            setError(error.message)
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
        <button > Login </button>
        <div>
        <a href="#!" className="forgotPassword" onClick={handleResetPassword}>Forgot Password?</a>
        </div>    
        </div>
    
        </form>
        <div className="botones">
        <div>
        <button onClick={handleGoogleSignIn} > Login with Google </button>
        </div>
        <div  className="forgotPassword">
        <Link to={'/register'} ><p href="#!" >Dont have an account?</p></Link>
        </div>    
        </div>
        </div>
        </div>
        </div>
    )
}

export default Login