# ColorCompass 🧭

A modern, responsive color utility application built with React, TypeScript, and Tailwind CSS.

![ColorCompass Screenshot](https://github.com/user-attachments/assets/968c14ea-ea2c-4774-a28e-355bb361a87d)

## Features

- 🎨 **Interactive Color Picker**: Choose colors using a visual color picker or hex input
- 🎲 **Random Color Generator**: Generate random colors with a single click
- 📋 **Multiple Color Formats**: View and copy colors in HEX, RGB, and HSL formats
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌓 **Dark Mode Support**: Built with dark mode compatibility
- ⚡ **Fast & Modern**: Built with Vite for lightning-fast development and building

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**:
  - Unit Tests: Vitest + React Testing Library
  - E2E Tests: Playwright
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Deployment**: Netlify (configured with `netlify.toml`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LarsDenBakker/ColorCompass.git
cd ColorCompass
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── components/          # React components
│   ├── ColorCard.tsx   # Color display and format conversion
│   ├── ColorGenerator.tsx # Color input and generation
│   └── __tests__/      # Component tests
├── utils/              # Utility functions
│   ├── colorUtils.ts   # Color conversion utilities
│   └── __tests__/      # Utility tests
├── test/               # Test setup
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Features in Detail

### Color Generation

- Visual color picker for intuitive color selection
- Text input for precise hex color values
- Random color generator for inspiration

### Color Format Conversion

- **HEX**: Standard hexadecimal color codes
- **RGB**: Red, Green, Blue values (0-255)
- **HSL**: Hue, Saturation, Lightness values

### Copy to Clipboard

Click any color value to copy it to your clipboard for easy use in your projects.

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Components and utilities are tested with Vitest and React Testing Library
- **E2E Tests**: Full application flows are tested with Playwright
- **Coverage**: Test coverage reports available

Run all tests:

```bash
npm test && npm run test:e2e
```

## Deployment

The project is configured for deployment on Netlify:

1. Build output directory: `dist`
2. Build command: `npm run build`
3. Node.js version: 18
4. Includes redirects for SPA routing
5. Optimized caching headers

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Tested with [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/)
- Icons from [Emoji](https://emojipedia.org/)
