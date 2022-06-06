import '../../scss/NavBar.scss';
import {GiTechnoHeart} from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <header className="navbar">
        <nav >
            <div className="logo">        
            <Link to={'/'} > <GiTechnoHeart size={50} color="white"/></Link>  
            <h1 className="titulo">Heart Tech</h1>
            </div>
            <ul>
                
                <li>
                <Link to={'/'} >Home</Link>
                    <Link to={'/'} >Products</Link>
                    <Link to={'/cart'} > Cart  <BsCart4/></Link>
                    <Link to={'/about'} > About</Link>  
                </li>
            </ul>
        </nav>
        </header>


    )
}
export default NavBar