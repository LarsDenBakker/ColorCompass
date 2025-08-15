import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>ColorCompass 🧭</h1>
        <p>Navigate the world of colors with ease</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <h2>Hello World!</h2>
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="button"
          >
            Tapped {count} times
          </button>
          <p>This is a mobile-first React app built with Vite.</p>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Built with React, Vite, and ❤️</p>
      </footer>
    </div>
  )
}

export default App
