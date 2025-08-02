import { useState } from 'react'
import type { PersonalColors } from '../utils/colorUtils'
import {
  getSkinToneHex,
  getHairColorHex,
  getEyeColorHex,
  getColorSuggestions,
} from '../utils/colorUtils'

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
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
        Personal Color Analysis
      </h2>

      <div className="space-y-8">
        {/* Skin Tone Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Skin Tone
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(['light', 'medium', 'dark', 'deep'] as const).map(tone => (
              <button
                key={tone}
                onClick={() => handlePersonalColorChange('skinTone', tone)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  personalColors.skinTone === tone
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg ring-2 ring-purple-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 bg-white dark:bg-gray-800'
                }`}
              >
                <div
                  className="w-full h-12 rounded-lg mb-3 shadow-inner border border-gray-200 dark:border-gray-600"
                  style={{ backgroundColor: getSkinToneHex(tone) }}
                />
                <span
                  className={`text-sm font-medium capitalize ${
                    personalColors.skinTone === tone
                      ? 'text-purple-700 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tone}
                </span>
                {personalColors.skinTone === tone && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hair Color Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Hair Color
          </label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {(['blonde', 'brown', 'black', 'red', 'grey'] as const).map(hair => (
              <button
                key={hair}
                onClick={() => handlePersonalColorChange('hairColor', hair)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  personalColors.hairColor === hair
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg ring-2 ring-purple-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 bg-white dark:bg-gray-800'
                }`}
              >
                <div
                  className="w-full h-8 rounded-lg mb-2 shadow-inner border border-gray-200 dark:border-gray-600"
                  style={{ backgroundColor: getHairColorHex(hair) }}
                />
                <span
                  className={`text-xs font-medium capitalize ${
                    personalColors.hairColor === hair
                      ? 'text-purple-700 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {hair}
                </span>
                {personalColors.hairColor === hair && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Eye Color Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Eye Color
          </label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {(['blue', 'green', 'brown', 'hazel', 'grey'] as const).map(eye => (
              <button
                key={eye}
                onClick={() => handlePersonalColorChange('eyeColor', eye)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  personalColors.eyeColor === eye
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg ring-2 ring-purple-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 bg-white dark:bg-gray-800'
                }`}
              >
                <div
                  className="w-full h-8 rounded-full mb-2 shadow-inner border border-gray-200 dark:border-gray-600"
                  style={{ backgroundColor: getEyeColorHex(eye) }}
                />
                <span
                  className={`text-xs font-medium capitalize ${
                    personalColors.eyeColor === eye
                      ? 'text-purple-700 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {eye}
                </span>
                {personalColors.eyeColor === eye && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Color Suggestions */}
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ✨ Recommended Colors for You
          </h3>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {colorSuggestions.map((color, index) => (
              <button
                key={index}
                onClick={() => onColorSelect(color)}
                className="group aspect-square rounded-2xl border-3 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
                style={{ backgroundColor: color }}
                title={`Click to select ${color}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-2 ring-white/30 rounded-2xl group-hover:ring-white/50 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Use Skin Tone as Background */}
        <div>
          <button
            onClick={() => onColorSelect(skinToneHex)}
            className="w-full flex items-center justify-center gap-3 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            style={{ backgroundColor: skinToneHex + '15' }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-lg"
              style={{ backgroundColor: skinToneHex }}
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              ✨ Use my skin tone as background
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalColorAnalysis
