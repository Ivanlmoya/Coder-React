import '../../scss/NavBar.scss';
import {GiTechnoHeart} from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";

const NavBar = () => {
    return(
        <nav>
            <div className="logo">         
            <GiTechnoHeart size={50} color="white"/>
            <h1 className="titulo">Heart Tech</h1>
            </div>
            <ul>
                
                <li>
                    <a>Home</a>
                    <a>Products</a>
                    <a><BsCart4/> Cart </a>
                    <a>About</a>
                </li>
            </ul>
        </nav>


    )
}
export default NavBar