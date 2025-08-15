# ColorCompass 🧭

A modern, responsive color utility application built with React, TypeScript, and Vite.

![Desktop View](https://github.com/user-attachments/assets/52dd8178-6f9c-407c-92dc-2dde21875eb6)

![Mobile View](https://github.com/user-attachments/assets/f7df1ae7-60d7-434a-a828-a76f80bd1473)

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 18+
- npm

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
- `npm run test:e2e` - Run E2E tests (requires `npx playwright install`)
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── __tests__/          # Unit tests
├── test/               # Test setup
├── App.tsx             # Main application component
├── App.css             # Application styles
├── main.tsx            # Application entry point
└── index.css           # Global styles

tests/                  # E2E tests
├── homepage.spec.ts    # Homepage E2E tests

```

## Features

- **Mobile-first design** - Responsive layout optimized for mobile devices
- **Touch-friendly interactions** - Designed for touch interfaces
- **Clean UI** - Simple and intuitive user interface
- **Type-safe** - Built with TypeScript for better developer experience
- **Fast development** - Powered by Vite for lightning-fast builds
- **Comprehensive testing** - Unit tests with Vitest and E2E tests with Playwright

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
First install Playwright browsers:
```bash
npx playwright install
```

Then run the tests:
```bash
npm run test:e2e
```

## License

This project is open source and available under the [MIT License](LICENSE).
