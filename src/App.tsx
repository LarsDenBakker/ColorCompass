import { useState } from 'react'
import ColorCard from './components/ColorCard'
import ColorGenerator from './components/ColorGenerator'

function App() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🧭 ColorCompass</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Navigate the world of colors with ease
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ColorGenerator selectedColor={selectedColor} onColorChange={setSelectedColor} />
          <ColorCard color={selectedColor} />
        </div>

        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Built with React, Vite, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App
