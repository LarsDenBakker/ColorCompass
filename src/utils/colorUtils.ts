// Color utility functions for ColorCompass

export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Convert RGB to HSL
 */
export const rgbToHsl = (r: number, g: number, b: number): HSL => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Generate a random hex color
 */
export const generateRandomColor = (): string => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

/**
 * Convert HSL to RGB
 */
export const hslToRgb = (h: number, s: number, l: number): RGB => {
  h = h / 360
  s = s / 100
  l = l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 1 / 6) {
    r = c
    g = x
    b = 0
  } else if (1 / 6 <= h && h < 2 / 6) {
    r = x
    g = c
    b = 0
  } else if (2 / 6 <= h && h < 3 / 6) {
    r = 0
    g = c
    b = x
  } else if (3 / 6 <= h && h < 4 / 6) {
    r = 0
    g = x
    b = c
  } else if (4 / 6 <= h && h < 5 / 6) {
    r = x
    g = 0
    b = c
  } else if (5 / 6 <= h && h < 1) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

/**
 * Convert HSL to hex
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * Convert RGB to hex
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

/**
 * Get complementary color
 */
export const getComplementaryColor = (hex: string): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const complementaryHue = (hsl.h + 180) % 360
  return hslToHex(complementaryHue, hsl.s, hsl.l)
}

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

/**
 * RAL Color data - Popular RAL colors
 */
export interface RALColor {
  number: string
  name: string
  hex: string
}

export const RAL_COLORS: RALColor[] = [
  { number: 'RAL 1000', name: 'Green beige', hex: '#BEBD7F' },
  { number: 'RAL 1001', name: 'Beige', hex: '#C2B078' },
  { number: 'RAL 1002', name: 'Sand yellow', hex: '#C6A664' },
  { number: 'RAL 1003', name: 'Signal yellow', hex: '#E5BE01' },
  { number: 'RAL 1004', name: 'Golden yellow', hex: '#CDA434' },
  { number: 'RAL 1005', name: 'Honey yellow', hex: '#A98307' },
  { number: 'RAL 1006', name: 'Maize yellow', hex: '#E4A010' },
  { number: 'RAL 1007', name: 'Daffodil yellow', hex: '#DC9D00' },
  { number: 'RAL 1011', name: 'Brown beige', hex: '#8A6642' },
  { number: 'RAL 1012', name: 'Lemon yellow', hex: '#C7B446' },
  { number: 'RAL 1013', name: 'Oyster white', hex: '#EAE6CA' },
  { number: 'RAL 1014', name: 'Ivory', hex: '#E1CC4F' },
  { number: 'RAL 1015', name: 'Light ivory', hex: '#E6D690' },
  { number: 'RAL 1016', name: 'Sulfur yellow', hex: '#EDFF21' },
  { number: 'RAL 1017', name: 'Saffron yellow', hex: '#F5D033' },
  { number: 'RAL 1018', name: 'Zinc yellow', hex: '#F8F32B' },
  { number: 'RAL 1019', name: 'Grey beige', hex: '#9E9764' },
  { number: 'RAL 1020', name: 'Olive yellow', hex: '#999950' },
  { number: 'RAL 1021', name: 'Rape yellow', hex: '#F3DA0B' },
  { number: 'RAL 1023', name: 'Traffic yellow', hex: '#FAD201' },
  { number: 'RAL 1024', name: 'Ochre yellow', hex: '#AEA04B' },
  { number: 'RAL 1027', name: 'Curry', hex: '#9D9101' },
  { number: 'RAL 1028', name: 'Melon yellow', hex: '#F4A900' },
  { number: 'RAL 1032', name: 'Broom yellow', hex: '#D6AE01' },
  { number: 'RAL 1033', name: 'Dahlia yellow', hex: '#F3A505' },
  { number: 'RAL 1034', name: 'Pastel yellow', hex: '#EFA94A' },
  { number: 'RAL 1035', name: 'Pearl beige', hex: '#6A5D4D' },
  { number: 'RAL 1036', name: 'Pearl gold', hex: '#705335' },
  { number: 'RAL 1037', name: 'Sun yellow', hex: '#F39800' },
  { number: 'RAL 2000', name: 'Yellow orange', hex: '#ED760E' },
  { number: 'RAL 2001', name: 'Red orange', hex: '#C93C20' },
  { number: 'RAL 2002', name: 'Vermilion', hex: '#CB2821' },
  { number: 'RAL 2003', name: 'Pastel orange', hex: '#FF7514' },
  { number: 'RAL 2004', name: 'Pure orange', hex: '#F44611' },
  { number: 'RAL 2005', name: 'Luminous orange', hex: '#FF2301' },
  { number: 'RAL 2007', name: 'Luminous bright orange', hex: '#FFA420' },
  { number: 'RAL 2008', name: 'Bright red orange', hex: '#F75E25' },
  { number: 'RAL 2009', name: 'Traffic orange', hex: '#F54021' },
  { number: 'RAL 2010', name: 'Signal orange', hex: '#D84B20' },
  { number: 'RAL 2011', name: 'Deep orange', hex: '#EC7C26' },
  { number: 'RAL 2012', name: 'Salmon range', hex: '#E55137' },
  { number: 'RAL 3000', name: 'Flame red', hex: '#AF2B1E' },
  { number: 'RAL 3001', name: 'Signal red', hex: '#A52019' },
  { number: 'RAL 3002', name: 'Carmine red', hex: '#A2231D' },
  { number: 'RAL 3003', name: 'Ruby red', hex: '#9B111E' },
  { number: 'RAL 3004', name: 'Purple red', hex: '#75151E' },
  { number: 'RAL 3005', name: 'Wine red', hex: '#5E2129' },
  { number: 'RAL 3007', name: 'Black red', hex: '#412227' },
  { number: 'RAL 3009', name: 'Oxide red', hex: '#642424' },
  { number: 'RAL 3011', name: 'Brown red', hex: '#781F19' },
  { number: 'RAL 3012', name: 'Beige red', hex: '#C1876B' },
  { number: 'RAL 3013', name: 'Tomato red', hex: '#A12312' },
  { number: 'RAL 3014', name: 'Antique pink', hex: '#D36E70' },
  { number: 'RAL 3015', name: 'Light pink', hex: '#EA899A' },
  { number: 'RAL 3016', name: 'Coral red', hex: '#B32821' },
  { number: 'RAL 3017', name: 'Rose', hex: '#E63244' },
  { number: 'RAL 3018', name: 'Strawberry red', hex: '#D53032' },
  { number: 'RAL 3020', name: 'Traffic red', hex: '#CC0605' },
  { number: 'RAL 3022', name: 'Salmon pink', hex: '#D95030' },
  { number: 'RAL 3024', name: 'Luminous red', hex: '#F80000' },
  { number: 'RAL 3026', name: 'Luminous bright red', hex: '#FE0000' },
  { number: 'RAL 3027', name: 'Raspberry red', hex: '#C51D34' },
  { number: 'RAL 3028', name: 'Pure red', hex: '#CC0605' },
  { number: 'RAL 3031', name: 'Orient red', hex: '#B32428' },
  { number: 'RAL 3032', name: 'Pearl ruby red', hex: '#721422' },
  { number: 'RAL 3033', name: 'Pearl pink', hex: '#B44C43' },
  { number: 'RAL 4001', name: 'Red lilac', hex: '#6D3F5B' },
  { number: 'RAL 4002', name: 'Red violet', hex: '#922B3E' },
  { number: 'RAL 4003', name: 'Heather violet', hex: '#DE4C8A' },
  { number: 'RAL 4004', name: 'Claret violet', hex: '#641C34' },
  { number: 'RAL 4005', name: 'Blue lilac', hex: '#6C4675' },
  { number: 'RAL 4006', name: 'Traffic purple', hex: '#A03472' },
  { number: 'RAL 4007', name: 'Purple violet', hex: '#4A192C' },
  { number: 'RAL 4008', name: 'Signal violet', hex: '#924874' },
  { number: 'RAL 4009', name: 'Pastel violet', hex: '#A18594' },
  { number: 'RAL 4010', name: 'Telemagenta', hex: '#CF3476' },
  { number: 'RAL 4011', name: 'Pearl violet', hex: '#8673A1' },
  { number: 'RAL 5000', name: 'Violet blue', hex: '#354D73' },
  { number: 'RAL 5001', name: 'Green blue', hex: '#1F3A93' },
  { number: 'RAL 5002', name: 'Ultramarine blue', hex: '#20214F' },
  { number: 'RAL 5003', name: 'Sapphire blue', hex: '#1D1E33' },
  { number: 'RAL 5004', name: 'Black blue', hex: '#18171C' },
  { number: 'RAL 5005', name: 'Signal blue', hex: '#1E2460' },
  { number: 'RAL 5007', name: 'Brillant blue', hex: '#3E5F8A' },
  { number: 'RAL 5008', name: 'Grey blue', hex: '#26252D' },
  { number: 'RAL 5009', name: 'Azure blue', hex: '#025669' },
  { number: 'RAL 5010', name: 'Gentian blue', hex: '#0E294B' },
  { number: 'RAL 5011', name: 'Steel blue', hex: '#231A24' },
  { number: 'RAL 5012', name: 'Light blue', hex: '#3B83BD' },
  { number: 'RAL 5013', name: 'Cobalt blue', hex: '#1E213D' },
  { number: 'RAL 5014', name: 'Pigeon blue', hex: '#606E8C' },
  { number: 'RAL 5015', name: 'Sky blue', hex: '#2271B3' },
  { number: 'RAL 5017', name: 'Traffic blue', hex: '#063971' },
  { number: 'RAL 5018', name: 'Turquoise blue', hex: '#3F888F' },
  { number: 'RAL 5019', name: 'Capri blue', hex: '#1B5583' },
  { number: 'RAL 5020', name: 'Ocean blue', hex: '#1D334A' },
  { number: 'RAL 5021', name: 'Water blue', hex: '#256D7B' },
  { number: 'RAL 5022', name: 'Night blue', hex: '#252850' },
  { number: 'RAL 5023', name: 'Distant blue', hex: '#49678D' },
  { number: 'RAL 5024', name: 'Pastel blue', hex: '#5D9B9B' },
  { number: 'RAL 6000', name: 'Patina green', hex: '#316650' },
  { number: 'RAL 6001', name: 'Emerald green', hex: '#287233' },
  { number: 'RAL 6002', name: 'Leaf green', hex: '#2D5016' },
  { number: 'RAL 6003', name: 'Olive green', hex: '#424632' },
  { number: 'RAL 6004', name: 'Blue green', hex: '#1F3A93' },
  { number: 'RAL 6005', name: 'Moss green', hex: '#2F4538' },
  { number: 'RAL 6006', name: 'Grey olive', hex: '#3E3B32' },
  { number: 'RAL 6007', name: 'Bottle green', hex: '#343B29' },
  { number: 'RAL 6008', name: 'Brown green', hex: '#39352A' },
  { number: 'RAL 6009', name: 'Fir green', hex: '#31372B' },
  { number: 'RAL 6010', name: 'Grass green', hex: '#35682D' },
  { number: 'RAL 6011', name: 'Reseda green', hex: '#587246' },
  { number: 'RAL 6012', name: 'Black green', hex: '#343E40' },
  { number: 'RAL 6013', name: 'Reed green', hex: '#6C7156' },
  { number: 'RAL 6014', name: 'Yellow olive', hex: '#47402E' },
  { number: 'RAL 6015', name: 'Black olive', hex: '#3B3C36' },
  { number: 'RAL 6016', name: 'Turquoise green', hex: '#1E5945' },
  { number: 'RAL 6017', name: 'Yellow green', hex: '#4C9141' },
  { number: 'RAL 6018', name: 'May green', hex: '#57A639' },
  { number: 'RAL 6019', name: 'Pastel green', hex: '#BDECB6' },
  { number: 'RAL 6020', name: 'Chrome green', hex: '#2E3A23' },
  { number: 'RAL 6021', name: 'Pale green', hex: '#89AC76' },
  { number: 'RAL 6022', name: 'Olive drab', hex: '#25221B' },
  { number: 'RAL 6024', name: 'Traffic green', hex: '#308446' },
  { number: 'RAL 6025', name: 'Fern green', hex: '#3D642D' },
  { number: 'RAL 6026', name: 'Opal green', hex: '#015D52' },
  { number: 'RAL 6027', name: 'Light green', hex: '#84C3CE' },
  { number: 'RAL 6028', name: 'Pine green', hex: '#2C5545' },
  { number: 'RAL 6029', name: 'Mint green', hex: '#20603D' },
  { number: 'RAL 6032', name: 'Signal green', hex: '#317F43' },
  { number: 'RAL 6033', name: 'Mint turquoise', hex: '#497E76' },
  { number: 'RAL 6034', name: 'Pastel turquoise', hex: '#7FB5B5' },
  { number: 'RAL 6035', name: 'Pearl green', hex: '#1C542D' },
  { number: 'RAL 6036', name: 'Pearl opal green', hex: '#193737' },
  { number: 'RAL 6037', name: 'Pure green', hex: '#008F39' },
  { number: 'RAL 6038', name: 'Luminous green', hex: '#00BB2D' },
  { number: 'RAL 7000', name: 'Squirrel grey', hex: '#78858B' },
  { number: 'RAL 7001', name: 'Silver grey', hex: '#8A9597' },
  { number: 'RAL 7002', name: 'Olive grey', hex: '#7E7B52' },
  { number: 'RAL 7003', name: 'Moss grey', hex: '#6C7059' },
  { number: 'RAL 7004', name: 'Signal grey', hex: '#969992' },
  { number: 'RAL 7005', name: 'Mouse grey', hex: '#646B63' },
  { number: 'RAL 7006', name: 'Beige grey', hex: '#6D6552' },
  { number: 'RAL 7008', name: 'Khaki grey', hex: '#6A5F31' },
  { number: 'RAL 7009', name: 'Green grey', hex: '#4D5645' },
  { number: 'RAL 7010', name: 'Tarpaulin grey', hex: '#4C514A' },
  { number: 'RAL 7011', name: 'Iron grey', hex: '#434B4D' },
  { number: 'RAL 7012', name: 'Basalt grey', hex: '#4E5754' },
  { number: 'RAL 7013', name: 'Brown grey', hex: '#464531' },
  { number: 'RAL 7015', name: 'Slate grey', hex: '#434750' },
  { number: 'RAL 7016', name: 'Anthracite grey', hex: '#293133' },
  { number: 'RAL 7021', name: 'Black grey', hex: '#23282B' },
  { number: 'RAL 7022', name: 'Umbra grey', hex: '#332F2C' },
  { number: 'RAL 7023', name: 'Concrete grey', hex: '#686C5E' },
  { number: 'RAL 7024', name: 'Graphite grey', hex: '#474A51' },
  { number: 'RAL 7026', name: 'Granite grey', hex: '#2F353B' },
  { number: 'RAL 7030', name: 'Stone grey', hex: '#8B8C7A' },
  { number: 'RAL 7031', name: 'Blue grey', hex: '#474B4E' },
  { number: 'RAL 7032', name: 'Pebble grey', hex: '#B8B799' },
  { number: 'RAL 7033', name: 'Cement grey', hex: '#7D8471' },
  { number: 'RAL 7034', name: 'Yellow grey', hex: '#8F8B66' },
  { number: 'RAL 7035', name: 'Light grey', hex: '#D7D7D7' },
  { number: 'RAL 7036', name: 'Platinum grey', hex: '#7F7679' },
  { number: 'RAL 7037', name: 'Dusty grey', hex: '#7D7F7D' },
  { number: 'RAL 7038', name: 'Agate grey', hex: '#B5B8B1' },
  { number: 'RAL 7039', name: 'Quartz grey', hex: '#6C6960' },
  { number: 'RAL 7040', name: 'Window grey', hex: '#9DA1AA' },
  { number: 'RAL 7042', name: 'Traffic grey A', hex: '#8D948D' },
  { number: 'RAL 7043', name: 'Traffic grey B', hex: '#4E5452' },
  { number: 'RAL 7044', name: 'Silk grey', hex: '#CAC4B0' },
  { number: 'RAL 7045', name: 'Telegrey 1', hex: '#909090' },
  { number: 'RAL 7046', name: 'Telegrey 2', hex: '#82898F' },
  { number: 'RAL 7047', name: 'Telegrey 4', hex: '#D0D0D0' },
  { number: 'RAL 7048', name: 'Pearl mouse grey', hex: '#898176' },
  { number: 'RAL 8000', name: 'Green brown', hex: '#826C34' },
  { number: 'RAL 8001', name: 'Ochre brown', hex: '#955F20' },
  { number: 'RAL 8002', name: 'Signal brown', hex: '#6C3B2A' },
  { number: 'RAL 8003', name: 'Clay brown', hex: '#734222' },
  { number: 'RAL 8004', name: 'Copper brown', hex: '#8E402A' },
  { number: 'RAL 8007', name: 'Fawn brown', hex: '#59351F' },
  { number: 'RAL 8008', name: 'Olive brown', hex: '#6F4F28' },
  { number: 'RAL 8011', name: 'Nut brown', hex: '#5B3A29' },
  { number: 'RAL 8012', name: 'Red brown', hex: '#592321' },
  { number: 'RAL 8014', name: 'Sepia brown', hex: '#382C1E' },
  { number: 'RAL 8015', name: 'Chestnut brown', hex: '#633A34' },
  { number: 'RAL 8016', name: 'Mahogany brown', hex: '#4C2F27' },
  { number: 'RAL 8017', name: 'Chocolate brown', hex: '#45322E' },
  { number: 'RAL 8019', name: 'Grey brown', hex: '#403A3A' },
  { number: 'RAL 8022', name: 'Black brown', hex: '#212121' },
  { number: 'RAL 8023', name: 'Orange brown', hex: '#A65E2E' },
  { number: 'RAL 8024', name: 'Beige brown', hex: '#79553D' },
  { number: 'RAL 8025', name: 'Pale brown', hex: '#755C48' },
  { number: 'RAL 8028', name: 'Terra brown', hex: '#4E3B31' },
  { number: 'RAL 8029', name: 'Pearl copper', hex: '#763C28' },
  { number: 'RAL 9001', name: 'Cream', hex: '#FDF4E3' },
  { number: 'RAL 9002', name: 'Grey white', hex: '#E7EBDA' },
  { number: 'RAL 9003', name: 'Signal white', hex: '#F4F4F4' },
  { number: 'RAL 9004', name: 'Signal black', hex: '#282828' },
  { number: 'RAL 9005', name: 'Jet black', hex: '#0A0A0A' },
  { number: 'RAL 9006', name: 'White aluminium', hex: '#A5A5A5' },
  { number: 'RAL 9007', name: 'Grey aluminium', hex: '#8F8F8F' },
  { number: 'RAL 9010', name: 'Pure white', hex: '#FFFFFF' },
  { number: 'RAL 9011', name: 'Graphite black', hex: '#1C1C1C' },
  { number: 'RAL 9016', name: 'Traffic white', hex: '#F6F6F6' },
  { number: 'RAL 9017', name: 'Traffic black', hex: '#1E1E1E' },
  { number: 'RAL 9018', name: 'Papyrus white', hex: '#D7D7D7' },
  { number: 'RAL 9022', name: 'Pearl light grey', hex: '#9C9C9C' },
  { number: 'RAL 9023', name: 'Pearl dark grey', hex: '#828282' },
]

/**
 * Personal color analysis utilities
 */
export interface PersonalColors {
  skinTone: 'light' | 'medium' | 'dark' | 'deep'
  hairColor: 'blonde' | 'brown' | 'black' | 'red' | 'grey'
  eyeColor: 'blue' | 'green' | 'brown' | 'hazel' | 'grey'
}

export const getSkinToneHex = (skinTone: PersonalColors['skinTone']): string => {
  const skinTones = {
    light: '#F5DEB3', // Wheat
    medium: '#DEB887', // Burlywood
    dark: '#CD853F', // Peru
    deep: '#8B4513', // Saddle brown
  }
  return skinTones[skinTone]
}

export const getColorSuggestions = (personalColors: PersonalColors): string[] => {
  const { skinTone, hairColor, eyeColor } = personalColors

  // Color suggestions based on personal color analysis theory
  const suggestions: string[] = []

  // Base suggestions by skin tone
  if (skinTone === 'light') {
    suggestions.push('#E6E6FA', '#B0C4DE', '#F0E68C', '#FFB6C1') // Lavender, Light steel blue, Khaki, Light pink
  } else if (skinTone === 'medium') {
    suggestions.push('#F4A460', '#87CEEB', '#DDA0DD', '#F0E68C') // Sandy brown, Sky blue, Plum, Khaki
  } else if (skinTone === 'dark') {
    suggestions.push('#FF6347', '#4169E1', '#FFD700', '#FF69B4') // Tomato, Royal blue, Gold, Hot pink
  } else if (skinTone === 'deep') {
    suggestions.push('#FF4500', '#8A2BE2', '#FFFF00', '#FF1493') // Orange red, Blue violet, Yellow, Deep pink
  }

  // Additional suggestions based on hair color
  if (hairColor === 'blonde') {
    suggestions.push('#87CEFA', '#FFB6C1', '#98FB98') // Light sky blue, Light pink, Pale green
  } else if (hairColor === 'brown') {
    suggestions.push('#8FBC8F', '#F4A460', '#DDA0DD') // Dark sea green, Sandy brown, Plum
  } else if (hairColor === 'black') {
    suggestions.push('#FF69B4', '#00CED1', '#FFD700') // Hot pink, Dark turquoise, Gold
  } else if (hairColor === 'red') {
    suggestions.push('#228B22', '#4169E1', '#FFD700') // Forest green, Royal blue, Gold
  } else if (hairColor === 'grey') {
    suggestions.push('#800080', '#4169E1', '#FF69B4') // Purple, Royal blue, Hot pink
  }

  // Additional suggestions based on eye color
  if (eyeColor === 'blue') {
    suggestions.push('#FFA500', '#FF6347', '#FFD700') // Orange, Tomato, Gold
  } else if (eyeColor === 'green') {
    suggestions.push('#FF69B4', '#8B0000', '#FF4500') // Hot pink, Dark red, Orange red
  } else if (eyeColor === 'brown') {
    suggestions.push('#4169E1', '#228B22', '#FF69B4') // Royal blue, Forest green, Hot pink
  } else if (eyeColor === 'hazel') {
    suggestions.push('#8FBC8F', '#F4A460', '#DDA0DD') // Dark sea green, Sandy brown, Plum
  } else if (eyeColor === 'grey') {
    suggestions.push('#FF1493', '#00CED1', '#FFD700') // Deep pink, Dark turquoise, Gold
  }

  // Remove duplicates and return up to 6 suggestions
  return [...new Set(suggestions)].slice(0, 6)
}
