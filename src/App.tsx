import { useState } from 'react'
import ColorCard from './components/ColorCard'
import ColorGenerator from './components/ColorGenerator'
import PersonalColorAnalysis from './components/PersonalColorAnalysis'
import RALColors from './components/RALColors'
import Moodboard from './components/Moodboard'

function App() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [backgroundSkinTone, setBackgroundSkinTone] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'generator' | 'personal' | 'ral' | 'moodboard'>(
    'generator'
  )

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const handlePersonalColorSelect = (color: string) => {
    setSelectedColor(color)
    // Check if this is a skin tone color (light colors with some opacity)
    if (
      color.match(/^#[F-f][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9]$/) ||
      color.match(/^#[D-Ee][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9]$/) ||
      color.match(/^#[C-c][D-Ed][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9]$/) ||
      color.match(/^#[8-9A-Bb][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9][A-Fa-f0-9]$/)
    ) {
      setBackgroundSkinTone(color)
    }
  }

  const backgroundStyle = backgroundSkinTone
    ? { backgroundColor: backgroundSkinTone + '15' } // Add transparency
    : {}

  const tabs = [
    { id: 'generator' as const, label: '🎨 Generator', icon: '🎨' },
    { id: 'personal' as const, label: '👤 Personal', icon: '👤' },
    { id: 'ral' as const, label: '🏭 RAL Colors', icon: '🏭' },
    { id: 'moodboard' as const, label: '📌 Moodboard', icon: '📌' },
  ]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <header className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            🧭 ColorCompass
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Navigate the world of colors with ease
          </p>
          {backgroundSkinTone && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Background tinted with your skin tone
            </p>
          )}
        </header>

        {/* Mobile-first tab navigation */}
        <div className="mb-6">
          <div className="flex overflow-x-auto pb-2 gap-2 sm:justify-center">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xl">{tab.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left column - ColorCard (always visible) */}
          <div className="order-2 lg:order-1">
            <ColorCard color={selectedColor} />
          </div>

          {/* Right column - Active tab content */}
          <div className="order-1 lg:order-2">
            {activeTab === 'generator' && (
              <ColorGenerator selectedColor={selectedColor} onColorChange={handleColorChange} />
            )}

            {activeTab === 'personal' && (
              <PersonalColorAnalysis onColorSelect={handlePersonalColorSelect} />
            )}

            {activeTab === 'ral' && <RALColors onColorSelect={handleColorChange} />}

            {activeTab === 'moodboard' && (
              <Moodboard currentColor={selectedColor} onColorSelect={handleColorChange} />
            )}
          </div>
        </div>

        <footer className="text-center mt-12 sm:mt-16 text-gray-500 dark:text-gray-400">
          <p className="text-sm sm:text-base">Built with React, Vite, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App
