import '../../scss/NavBar.scss';
import {GiTechnoHeart} from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { Link , useLocation} from 'react-router-dom';
import { useContext , useState } from 'react';
import CartContext from '../../context/CartContext';
import { useAuth } from "../../context/authContext"
import React from 'react';

const NavBar = () => {

    const { getCount } = useContext(CartContext)

    const {user ,logout , loading} = useAuth();

    const [LogOut, setLogOut] = useState(true)

    let location = useLocation()

    const handleLogOut = async () =>{
        await logout()
        setLogOut(false)
    }
    const count = getCount()
    if(location.pathname === '/login'|| location.pathname === '/register'||  location.pathname === '/' ) return null
    return(
        <header className="navbar">
        <nav >
            <div className="logo">        
            <Link to={'/products'} > <GiTechnoHeart size={50} color="white"/></Link>  
            <h1 className="titulo">Heart Tech</h1>
            </div>
            <div className="categorias">
            <Link className="categoriasBoton" to={'/category/Nike'} >Nike</Link>
            <Link className="categoriasBoton" to={'/category/Topper'} >Topper</Link>
            <Link className="categoriasBoton" to={'/category/Reebok'} >Reebok</Link>
            </div>
            <div>
            <ul>
                <li>
                <Link to={'/products'} >Products</Link>
                <Link to={'/cart'} > {count > 0 ? count :'Cart ' }<BsCart4/></Link>
                <Link to={'/contact'} > contact Us</Link>  
                </li>
            </ul>
            </div>
            <div className="botones">
            <div className="usuarioNav">
            <div className="usuarioNavP">
            {LogOut ?  <p>Bienvendido! { user.displayName === null ? user.email : user.displayName}</p> : null}
            </div>
            <div>
            {LogOut ? <div>{user.photoURL === null ?  null: <img width="50" height="50"src={user.photoURL}/>}</div> : null}
            </div>
            <div>
            <button onClick={handleLogOut}>Log Out</button>
            </div>
            </div>
            </div>
        </nav>
        </header>


    )
}
export default NavBar