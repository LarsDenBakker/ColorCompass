import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the ColorCompass title', () => {
    render(<App />);
    expect(screen.getByText('COLOR')).toBeInTheDocument();
    expect(screen.getByText('Compass')).toBeInTheDocument();
  });

  it('renders navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SKIN')).toBeInTheDocument();
    expect(screen.getByText('PAINT')).toBeInTheDocument();
    expect(screen.getByText('MOODBOARD')).toBeInTheDocument();
  });

  it('renders color selection interface', () => {
    render(<App />);
    expect(screen.getByText('SELECTED')).toBeInTheDocument();
    expect(screen.getByText('main color')).toBeInTheDocument();
  });

  it('renders checkboxes with correct initial state', () => {
    render(<App />);
    const skinToneCheckbox = screen.getByLabelText('skin tone');
    const paintColorCheckbox = screen.getByLabelText('paint color');
    const exportCheckbox = screen.getByLabelText('export to moodboard');
    
    expect(skinToneCheckbox).toBeChecked();
    expect(paintColorCheckbox).toBeChecked();
    expect(exportCheckbox).not.toBeChecked();
  });

  it('toggles checkboxes when clicked', () => {
    render(<App />);
    const exportCheckbox = screen.getByLabelText('export to moodboard');
    
    expect(exportCheckbox).not.toBeChecked();
    fireEvent.click(exportCheckbox);
    expect(exportCheckbox).toBeChecked();
  });

  it('switches navigation tabs when clicked', () => {
    render(<App />);
    const homeTab = screen.getByRole('button', { name: /HOME/i });
    const skinTab = screen.getByRole('button', { name: /SKIN/i });
    
    expect(homeTab).toHaveClass('active');
    expect(skinTab).not.toHaveClass('active');
    
    fireEvent.click(skinTab);
    expect(skinTab).toHaveClass('active');
    expect(homeTab).not.toHaveClass('active');
  });

  it('renders instruction text', () => {
    render(<App />);
    expect(screen.getByText('click or drag on the color rings to select')).toBeInTheDocument();
  });

  it('renders color wheel with interactive rings', () => {
    render(<App />);
    const colorWheel = document.querySelector('.color-wheel');
    expect(colorWheel).toBeInTheDocument();
    expect(colorWheel).toHaveAttribute('viewBox', '0 0 400 400');
  });

  it('displays main color swatch', () => {
    render(<App />);
    const colorSwatches = document.querySelectorAll('.color-swatch');
    expect(colorSwatches.length).toBeGreaterThan(0);
  });
});