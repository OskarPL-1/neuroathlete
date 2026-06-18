// tests/ReactionTest.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReactionTest from '../app/reaction-test/page';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ReactionTest Component', () => {
  it('powinien wyświetlić przycisk rozpoczęcia', () => {
    render(<ReactionTest />);
    expect(screen.getByText('Przygotuj się i kliknij')).toBeInTheDocument();
  });
});