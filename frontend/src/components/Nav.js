import {Link} from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


const Nav = () => {
    return(
        <div className="nav">
            <ul>
                <li className="navname"><Link to="/posts"><FaHome /></Link></li>
                <li className="navname"><Link to="/users"><FaSearch /></Link></li>               
                <li className="navname"><Link to="/">Home</Link></li>
                <li className="navname"><Link to="/">Home</Link></li>
            </ul>
        </div>
    )
}
export default Nav