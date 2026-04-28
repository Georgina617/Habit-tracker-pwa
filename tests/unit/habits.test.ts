import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '../../src/lib/habits';
import type { Habit } from '../../src/types/habit';

describe('toggleHabitCompletion', () => {
  const baseHabit: Habit = {
    id: '1',
    userId: 'user-1',
    name: 'Drink Water',
    description: '',
    frequency: 'daily',
    createdAt: '2026-04-27',
    completions: [],
  };

  const today = '2026-04-27';

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(baseHabit, today);
    expect(result.completions).toContain(today);
  });

  it('removes a completion date when the date already exists', () => {
    const habitWithDate: Habit = {
      ...baseHabit,
      completions: [today],
    };

    const result = toggleHabitCompletion(habitWithDate, today);
    expect(result.completions).not.toContain(today);
  });

  it('does not mutate the original habit object', () => {
    const original: Habit = {
      ...baseHabit,
      completions: [],
    };

    const result = toggleHabitCompletion(original, today);

    expect(original.completions).toEqual([]);
    expect(result).not.toBe(original);
  });

  it('does not return duplicate completion dates', () => {
    const habitWithDuplicates: Habit = {
      ...baseHabit,
      completions: [today],
    };

    const result = toggleHabitCompletion(habitWithDuplicates, today);
    const result2 = toggleHabitCompletion(result, today);

    expect(result2.completions).toEqual([today]);
  });
});
