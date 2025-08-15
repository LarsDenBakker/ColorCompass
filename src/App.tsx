import { useState } from 'react'
import './App.css'

function App() {
  const [selectedColors] = useState({
    main: ['#8B5A9E', '#A55BAE', '#BE5CBE', '#D85CCE', '#F25CDE'],
    complementary: ['#3E8B5A', '#4EA55B', '#5EBE5C', '#6ED85C', '#7EF25C']
  })
  
  const [options, setOptions] = useState({
    skinTone: true,
    paintColor: true,
    exportToMoodboard: false
  })

  const [activeTab, setActiveTab] = useState('HOME')

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="color-text">COLOR</span>
          <span className="compass-text">Compass</span>
        </h1>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-tab ${activeTab === 'HOME' ? 'active' : ''}`}
          onClick={() => setActiveTab('HOME')}
        >
          HOME
        </button>
        <button 
          className={`nav-tab ${activeTab === 'SKIN' ? 'active' : ''}`}
          onClick={() => setActiveTab('SKIN')}
        >
          SKIN
          <span className="nav-icon">🎨</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'PAINT' ? 'active' : ''}`}
          onClick={() => setActiveTab('PAINT')}
        >
          PAINT
          <span className="nav-icon">🖌️</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'MOODBOARD' ? 'active' : ''}`}
          onClick={() => setActiveTab('MOODBOARD')}
        >
          MOODBOARD
          <span className="nav-icon">📋</span>
        </button>
      </nav>
      
      <main className="app-main">
        <div className="color-wheel-container">
          <svg className="color-wheel" viewBox="0 0 400 400">
            {/* Outer color ring */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="url(#colorGradient)" strokeWidth="20"/>
            {/* Middle rings */}
            <circle cx="200" cy="200" r="150" fill="none" stroke="#666" strokeWidth="15"/>
            <circle cx="200" cy="200" r="120" fill="none" stroke="#888" strokeWidth="12"/>
            <circle cx="200" cy="200" r="90" fill="none" stroke="#aaa" strokeWidth="10"/>
            {/* Center circle */}
            <circle cx="200" cy="200" r="70" fill="#8B5A9E"/>
            
            {/* Selection handles */}
            <circle cx="200" cy="50" r="8" fill="white" stroke="#333" strokeWidth="2"/>
            <circle cx="320" cy="140" r="8" fill="white" stroke="#333" strokeWidth="2"/>
            <circle cx="200" cy="350" r="8" fill="white" stroke="#333" strokeWidth="2"/>
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0000"/>
                <stop offset="16.66%" stopColor="#ff8800"/>
                <stop offset="33.33%" stopColor="#ffff00"/>
                <stop offset="50%" stopColor="#00ff00"/>
                <stop offset="66.66%" stopColor="#0088ff"/>
                <stop offset="83.33%" stopColor="#8800ff"/>
                <stop offset="100%" stopColor="#ff0088"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="color-selection">
          <h3 className="selection-title">SELECTED</h3>
          
          <div className="color-group">
            <label>main color</label>
            <div className="color-palette">
              {selectedColors.main.map((color, index) => (
                <div 
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="color-group">
            <label>complementary color</label>
            <div className="color-palette">
              {selectedColors.complementary.map((color, index) => (
                <div 
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="options">
            <label className="option">
              <input 
                type="checkbox" 
                checked={options.skinTone}
                onChange={(e) => setOptions({...options, skinTone: e.target.checked})}
              />
              skin tone
            </label>
            <label className="option">
              <input 
                type="checkbox" 
                checked={options.paintColor}
                onChange={(e) => setOptions({...options, paintColor: e.target.checked})}
              />
              paint color
            </label>
            <label className="option">
              <input 
                type="checkbox" 
                checked={options.exportToMoodboard}
                onChange={(e) => setOptions({...options, exportToMoodboard: e.target.checked})}
              />
              export to moodboard
            </label>
          </div>

          <p className="instruction">
            double tap or hold to select colors
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
