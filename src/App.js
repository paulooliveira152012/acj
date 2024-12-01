import React from 'react';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to My PWA</h1>
      <p>This is a simple Progressive Web App.</p>
      <button onClick={() => alert('Hello!')}>Click Me</button>
    </div>
  );
}

export default App;
