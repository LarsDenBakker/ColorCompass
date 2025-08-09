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
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950 dark:via-blue-950 dark:to-gray-900 transition-all duration-500"
      style={backgroundStyle}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
        {/* Modern header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300">
            <span className="text-3xl">🧭</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-tight">
            ColorCompass
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium">
            Navigate the world of colors with ease
          </p>
          {backgroundSkinTone && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
              <div
                className="w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: backgroundSkinTone }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Background tinted with your skin tone
              </p>
            </div>
          )}
        </header>

        {/* Modern tab navigation */}
        <div className="mb-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-2">
            <div className="flex overflow-x-auto pb-1 gap-2 sm:justify-center">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white shadow-2xl shadow-purple-500/25'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50'
                  }`}
                >
                  <span className="hidden sm:inline flex items-center gap-2">
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label.split(' ')[1] || tab.label}
                  </span>
                  <span className="sm:hidden text-2xl">{tab.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left column - ColorCard (always visible) */}
          <div className="order-2 xl:order-1">
            <ColorCard color={selectedColor} onColorChange={handleColorChange} />
          </div>

          {/* Right column - Active tab content */}
          <div className="order-1 xl:order-2">
            <div className="min-h-[600px]">
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
        </div>

        {/* Modern footer */}
        <footer className="text-center mt-16 sm:mt-20">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <span className="text-2xl">🎨</span>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Navigate the world of colors with ease
            </p>
            <span className="text-2xl">✨</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
