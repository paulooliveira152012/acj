import '../styles/style.css'
const Hero = () => {
    return (
        <div className="hero">
        <div className="darkHeroOverlay"></div>
        <div className="heroContent">
          <h1>TRUST FOR YOUR CAR!</h1>
          <p>Your car is in the hands of experts who truly care, ensuring top performance and your safety on every drive.</p>
          <button onClick={() => alert("Hello!")}>Get started</button>
        </div>
      </div>
    )
}

export default Hero