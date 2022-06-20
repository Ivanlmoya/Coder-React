import '../../scss/NavBar.scss';
import {GiTechnoHeart} from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';

const NavBar = () => {

    const { getCount } = useContext(CartContext)

    const count = getCount()

    return(
        <header className="navbar">
        <nav >
            <div className="logo">        
            <Link to={'/'} > <GiTechnoHeart size={50} color="white"/></Link>  
            <h1 className="titulo">Heart Tech</h1>
            </div>
             <div className="categorias">
             <Link className="categoriasBoton" to={'/category/zapatillas'} >Zapatillas</Link>
             <Link className="categoriasBoton" to={'/category/deportivas'} >Deportivas</Link>
             </div>
            <ul>
                
                <li>
                <Link to={'/'} >Home</Link>
                <Link to={'/'} >Products</Link>
                <Link to={'/cart'} > {count > 0 ? count :'Cart ' }<BsCart4/></Link>
                <Link to={'/contact'} > contact Us</Link>  
                </li>
            </ul>
        </nav>
        </header>


    )
}
export default NavBar