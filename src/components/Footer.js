import '../styles/style.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <h2>business Info</h2>
            </div>
            <div>
                <h2>links</h2>
                <ul>
                    <li>
                    <Link to="/accessibility-statement">Accessibility Statement</Link> 
                    </li>
                    <li>
                    <Link to="/privacy-policy" >Privacy Policy</Link>
                    </li>
                    
                </ul>
            </div>
            <div>
                <h2>adm</h2>
                <ul>
                    <li>
                        <Link to='/admLogin'>
                            login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer