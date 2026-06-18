// vitest.setup.ts
import '@testing-library/jest-dom/vitest';

// Extend matchers
declare global {
  namespace Vi {
    interface JestExtend {
      toBeInTheDocument(): void;
      toHaveTextContent(content: string): void;
    }
  }
}