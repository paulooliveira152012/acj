const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to My PWA</h1>
        <h2>Home Page</h2>
        <p>This is a simple Progressive Web App.</p>
        <button onClick={() => alert('Hello!')}>Click Me</button>
      </div>
    )
}

export default Home