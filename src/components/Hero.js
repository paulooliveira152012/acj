import '../styles/style.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
    return (
        <div className="hero"  role="banner" aria-labelledby="motor picture">
        <div className="darkHeroOverlay" aria-hidden="true" ></div>
        <div className="heroContent">
          <h1>TRUST FOR YOUR CAR!</h1>
          <p>Your car is in the hands of experts who truly care, ensuring top performance and your safety on every drive.</p>
          <button onClick={() => navigate('/contact-us')}>Get started</button>
        </div>
      </div>
    )
}

export default Hero