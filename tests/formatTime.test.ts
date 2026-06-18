// tests/formatTime.test.ts
import { describe, it, expect } from 'vitest';
import { formatTime } from '../implementation/plan_funkcji';

describe('formatTime', () => {
  it('powinien sformatować milisekundy poprawnie', () => {
    expect(formatTime(250)).toBe('250 ms');
  });

  it('powinien sformatować krótkie czasy', () => {
    expect(formatTime(150)).toBe('150 ms');
  });

  it('powinien sformatować długie czasy jako sekundy', () => {
    expect(formatTime(1500)).toBe('1.50 s');
  });

  it('powinien obsłużyć zero', () => {
    expect(formatTime(0)).toBe('0 ms');
  });
});