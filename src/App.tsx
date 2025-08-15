import React, { useState, useRef, useCallback } from 'react'
import './App.css'

function App() {
  const [selectedHue, setSelectedHue] = useState(280) // Start with purple hue
  const [selectedValue, setSelectedValue] = useState(0.7) // Start with moderate value
  const [mainColor, setMainColor] = useState('#8B5A9E')
  const [isDragging, setIsDragging] = useState(false)
  const colorWheelRef = useRef<SVGSVGElement>(null)
  
  const [options, setOptions] = useState({
    skinTone: true,
    paintColor: true,
    exportToMoodboard: false
  })

  const [activeTab, setActiveTab] = useState('HOME')

  // Convert HSV to RGB
  const hsvToRgb = (h: number, s: number, v: number) => {
    const c = v * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = v - c
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return `rgb(${r}, ${g}, ${b})`
  }

  // Convert RGB to hex
  const rgbToHex = (rgb: string) => {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (!match) return rgb
    
    const r = parseInt(match[1])
    const g = parseInt(match[2])
    const b = parseInt(match[3])
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  // Update main color when hue or value changes
  const updateMainColor = useCallback((hue: number, value: number) => {
    const color = hsvToRgb(hue, 1, value) // Full saturation, variable value
    const hexColor = rgbToHex(color)
    setMainColor(hexColor)
  }, [])

  // Initialize color on component mount
  React.useEffect(() => {
    updateMainColor(selectedHue, selectedValue)
  }, [selectedHue, selectedValue, updateMainColor])

  // Handle color wheel interactions
  const getColorWheelPosition = (event: React.MouseEvent<SVGSVGElement> | MouseEvent) => {
    if (!colorWheelRef.current) return null

    const rect = colorWheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = event.clientX - centerX
    const y = event.clientY - centerY
    const distance = Math.sqrt(x * x + y * y)
    const maxRadius = Math.min(rect.width, rect.height) / 2

    return { x, y, distance, maxRadius }
  }

  const handleColorWheelInteraction = (event: React.MouseEvent<SVGSVGElement>) => {
    const position = getColorWheelPosition(event)
    if (!position) return

    const { x, y, distance, maxRadius } = position

    // Outer ring (hue selection) - radius 160-180 in viewBox (scaled)
    const outerRingInner = (160 / 200) * maxRadius
    const outerRingOuter = (180 / 200) * maxRadius
    
    // Second ring (value selection) - radius 130-150 in viewBox (scaled)  
    const valueRingInner = (130 / 200) * maxRadius
    const valueRingOuter = (150 / 200) * maxRadius

    if (distance >= outerRingInner && distance <= outerRingOuter) {
      // Outer ring - hue selection
      const angle = (Math.atan2(y, x) * 180) / Math.PI
      const normalizedAngle = ((angle + 360) % 360)
      setSelectedHue(normalizedAngle)
      updateMainColor(normalizedAngle, selectedValue)
      setIsDragging(true)
    } else if (distance >= valueRingInner && distance <= valueRingOuter) {
      // Second ring - value selection (black to full color)
      // Map distance from inner to outer of ring to value 0-1
      const ringPosition = (distance - valueRingInner) / (valueRingOuter - valueRingInner)
      const value = Math.max(0, Math.min(1, ringPosition))
      setSelectedValue(value)
      updateMainColor(selectedHue, value)
      setIsDragging(true)
    }
  }

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return
    
    const position = getColorWheelPosition(event)
    if (!position) return

    const { x, y, distance, maxRadius } = position

    const outerRingInner = (160 / 200) * maxRadius
    const outerRingOuter = (180 / 200) * maxRadius
    const valueRingInner = (130 / 200) * maxRadius
    const valueRingOuter = (150 / 200) * maxRadius

    if (distance >= outerRingInner && distance <= outerRingOuter) {
      const angle = (Math.atan2(y, x) * 180) / Math.PI
      const normalizedAngle = ((angle + 360) % 360)
      setSelectedHue(normalizedAngle)
      updateMainColor(normalizedAngle, selectedValue)
    } else if (distance >= valueRingInner && distance <= valueRingOuter) {
      const ringPosition = (distance - valueRingInner) / (valueRingOuter - valueRingInner)
      const value = Math.max(0, Math.min(1, ringPosition))
      setSelectedValue(value)
      updateMainColor(selectedHue, value)
    }
  }, [isDragging, selectedHue, selectedValue, updateMainColor])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add mouse event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

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
          <svg 
            ref={colorWheelRef}
            className="color-wheel" 
            viewBox="0 0 400 400"
            onClick={handleColorWheelInteraction}
            onMouseDown={handleColorWheelInteraction}
          >
            {/* Outer color ring - for hue selection */}
            <circle 
              cx="200" 
              cy="200" 
              r="170" 
              fill="none" 
              stroke="url(#hueWheel)" 
              strokeWidth="20"
              style={{ cursor: 'pointer' }}
            />
            
            {/* Second ring - black to white gradient for value selection */}
            <circle 
              cx="200" 
              cy="200" 
              r="140" 
              fill="none" 
              stroke="url(#valueGradient)" 
              strokeWidth="20"
              style={{ cursor: 'pointer' }}
            />
            
            {/* Gradient definitions */}
            <defs>
              {/* Create a proper circular hue wheel */}
              <g id="hueWheelPattern">
                <circle cx="200" cy="200" r="175" fill="none" stroke="#ff0000" strokeWidth="30" strokeDasharray="3 3" />
              </g>
              
              {/* Use conic gradient effect by creating multiple segments */}
              <linearGradient id="hueWheel" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="16.66%" stopColor="#ff8800" />
                <stop offset="33.33%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#00ff00" />
                <stop offset="66.66%" stopColor="#0088ff" />
                <stop offset="83.33%" stopColor="#8800ff" />
                <stop offset="100%" stopColor="#ff0000" />
              </linearGradient>
              
              {/* Value gradient (white to black radially) */}
              <radialGradient id="valueGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="100%" stopColor="#000000"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="color-selection">
          <h3 className="selection-title">SELECTED</h3>
          
          <div className="color-group">
            <label>main color</label>
            <div className="color-palette">
              <div 
                className="color-swatch large-swatch"
                style={{ backgroundColor: mainColor }}
              />
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
            click or drag on the color rings to select
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
