import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the ColorCompass title', () => {
    render(<App />);
    expect(screen.getByText('ColorCompass 🧭')).toBeInTheDocument();
    expect(screen.getByText('Navigate the world of colors with ease')).toBeInTheDocument();
  });

  it('renders Hello World content', () => {
    render(<App />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
    expect(screen.getByText('This is a mobile-first React app built with Vite.')).toBeInTheDocument();
  });

  it('increments counter when button is clicked', () => {
    render(<App />);
    const button = screen.getByText('Tapped 0 times');
    
    fireEvent.click(button);
    expect(screen.getByText('Tapped 1 times')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('Tapped 2 times')).toBeInTheDocument();
  });

  it('renders footer text', () => {
    render(<App />);
    expect(screen.getByText('Built with React, Vite, and ❤️')).toBeInTheDocument();
  });
});