import { useState } from 'react'
import ColorGenerator from './components/ColorGenerator'
import PersonalColorAnalysis from './components/PersonalColorAnalysis'
import RALColors from './components/RALColors'
import Moodboard from './components/Moodboard'

function App() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [activeTab, setActiveTab] = useState<'generator' | 'personal' | 'ral' | 'moodboard'>(
    'generator'
  )
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const tabs = [
    { id: 'generator' as const, label: '🎨 Generator', icon: '🎨' },
    { id: 'personal' as const, label: '👤 Personal', icon: '👤' },
    { id: 'ral' as const, label: '🏭 RAL Colors', icon: '🏭' },
    { id: 'moodboard' as const, label: '📌 Moodboard', icon: '📌' },
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <div className="container mx-auto px-4 py-4">
        {/* Simple header with theme toggle */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-amber-500' : 'bg-blue-500'}`}
            >
              <span className="text-xl">🧭</span>
            </div>
            <h1 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ColorCompass
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isDarkMode
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            title="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className={`text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>Navigate the world of colors with ease</p>
        </div>

        {/* Simple tab navigation */}
        <div className="mb-6">
          <div
            className={`rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
          >
            <div className="flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label.split(' ')[1] || tab.label}</span>
                  <span className="sm:hidden">{tab.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="max-w-4xl mx-auto">
          {/* Active tab content */}
          {activeTab === 'generator' && (
            <ColorGenerator
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'personal' && <PersonalColorAnalysis onColorSelect={handleColorChange} />}

          {activeTab === 'ral' && <RALColors onColorSelect={handleColorChange} />}

          {activeTab === 'moodboard' && (
            <Moodboard currentColor={selectedColor} onColorSelect={handleColorChange} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
