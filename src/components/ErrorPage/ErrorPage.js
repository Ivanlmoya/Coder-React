import '../../scss/App.scss'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return(
		<div className="Container404">
			<div className="Page404">
				<h2>404</h2>
				<p>La pagina ingresada no existe.</p>
            </div>
            <div className="Link404">
            <p>No pudimos encontrar la pagina que estas buscando. Por favor intente otra pagina y verifique la URL ingesada.</p>
			<Link to={'/'} > <p className="buttonBack">Go back to home page</p></Link>
            </div>
		</div>     
    )
}
export default ErrorPage