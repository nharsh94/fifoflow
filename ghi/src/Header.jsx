import { Link } from 'react-router-dom'
import './Header.css'
import logoUrl from './assets/FIFOFlow_transparent_x1.png'

const Header = () => (
    <div className="header">
        <Link to="/home">
            <img src={logoUrl} alt="FIFOFlow Logo" />
        </Link>
    </div>
)
export default Header
