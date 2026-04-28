export function calculateCurrentStreak(
  completions: string[],
  today?: string,
): number {
  if (!completions.length) return 0;

  const uniqueDates = Array.from(new Set(completions)).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const currentDate = today ?? new Date().toISOString().split('T')[0];

  if (!uniqueDates.includes(currentDate)) {
    return 0;
  }

  let streak = 1;

  const todayIndex = uniqueDates.indexOf(currentDate);

  for (let i = todayIndex; i > 0; i--) {
    const current = new Date(uniqueDates[i]);
    const previous = new Date(uniqueDates[i - 1]);

    const diff =
      (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
