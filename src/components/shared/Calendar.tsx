'use client';

export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // empty slots before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // actual days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Calendar</h3>

      {/* WEEK HEADER */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
        {weekDays.map((d, i) => (
          <div key={`${d}-${i}`} className="font-medium text-gray-500">
            {d}
          </div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {days.map((day, i) => (
          <div
            key={i}
            className={`py-2 rounded-lg ${
              day === today.getDate()
                ? 'bg-blue-500 text-white font-semibold'
                : 'bg-white text-gray-700'
            }`}
          >
            {day ?? ''}
          </div>
        ))}
      </div>
    </div>
  );
}
