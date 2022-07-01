import { Link } from 'react-router-dom';
import React from 'react';

const Item = ({id, name , price,img }) =>{

    return(
        <div className="CardContainer">
        <div className="Card">
        <div className="UpperCard">
        <p>{name}</p>
        </div>
        <div className="MiddleCard">
        <img src={img} className="ImageCard"></img>
        <p>${price}</p>
        <Link to={`/detail/${id}`} className='VerDetalle'>Ver detalle</Link>
        </div>
        </div>
        </div>
    )

}

export default Item