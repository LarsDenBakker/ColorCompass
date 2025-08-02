import { useState } from 'react'
import type { PersonalColors } from '../utils/colorUtils'
import { getSkinToneHex, getColorSuggestions } from '../utils/colorUtils'

interface PersonalColorAnalysisProps {
  onColorSelect: (color: string) => void
}

const PersonalColorAnalysis = ({ onColorSelect }: PersonalColorAnalysisProps) => {
  const [personalColors, setPersonalColors] = useState<PersonalColors>({
    skinTone: 'light',
    hairColor: 'brown',
    eyeColor: 'brown',
  })

  const skinToneHex = getSkinToneHex(personalColors.skinTone)
  const colorSuggestions = getColorSuggestions(personalColors)

  const handlePersonalColorChange = (
    property: keyof PersonalColors,
    value: PersonalColors[keyof PersonalColors]
  ) => {
    setPersonalColors(prev => ({ ...prev, [property]: value }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Personal Color Analysis
      </h2>

      <div className="space-y-6">
        {/* Skin Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skin Tone
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['light', 'medium', 'dark', 'deep'] as const).map(tone => (
              <button
                key={tone}
                onClick={() => handlePersonalColorChange('skinTone', tone)}
                className={`p-3 rounded-lg border-2 transition-all capitalize ${
                  personalColors.skinTone === tone
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                }`}
              >
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: getSkinToneHex(tone) }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{tone}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hair Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hair Color
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {(['blonde', 'brown', 'black', 'red', 'grey'] as const).map(hair => (
              <button
                key={hair}
                onClick={() => handlePersonalColorChange('hairColor', hair)}
                className={`p-2 rounded-lg border-2 transition-all capitalize text-sm ${
                  personalColors.hairColor === hair
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                }`}
              >
                {hair}
              </button>
            ))}
          </div>
        </div>

        {/* Eye Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Eye Color
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {(['blue', 'green', 'brown', 'hazel', 'grey'] as const).map(eye => (
              <button
                key={eye}
                onClick={() => handlePersonalColorChange('eyeColor', eye)}
                className={`p-2 rounded-lg border-2 transition-all capitalize text-sm ${
                  personalColors.eyeColor === eye
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                }`}
              >
                {eye}
              </button>
            ))}
          </div>
        </div>

        {/* Color Suggestions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recommended Colors for You
          </h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {colorSuggestions.map((color, index) => (
              <button
                key={index}
                onClick={() => onColorSelect(color)}
                className="aspect-square rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                style={{ backgroundColor: color }}
                title={`Click to select ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Use Skin Tone as Background */}
        <div>
          <button
            onClick={() => onColorSelect(skinToneHex)}
            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-all duration-200"
            style={{ backgroundColor: skinToneHex + '20' }}
          >
            <div
              className="w-6 h-6 rounded-full border border-gray-400"
              style={{ backgroundColor: skinToneHex }}
            />
            <span className="text-gray-700 dark:text-gray-300">Use my skin tone as background</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalColorAnalysis
