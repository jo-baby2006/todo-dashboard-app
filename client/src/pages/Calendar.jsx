const calendarDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

const sampleCalendar = [
  { day: 1, event: 'Planning' },
  { day: 4, event: 'Standup' },
  { day: 8, event: 'Review' },
  { day: 12, event: 'Focus block' },
  { day: 19, event: 'Meetings' },
  { day: 23, event: 'Wrap up' },
];

function Calendar() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-blue-200">Schedule view</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Calendar</h1>
        <p className="mt-2 text-slate-300">
          Review your upcoming focus items and keep the week organized.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-300">
          {calendarDays.map((day) => (
            <div key={day} className="py-2 font-semibold">
              {day}
            </div>
          ))}

          {Array.from({ length: 31 }, (_, index) => {
            const event = sampleCalendar.find((item) => item.day === index + 1);
            const isHighlighted = Boolean(event);

            return (
              <div
                key={index}
                className={`rounded-xl border border-white/10 px-2 py-4 ${
                  isHighlighted ? 'bg-blue-500/20' : 'bg-white/5'
                }`}
              >
                <p className="text-white">{index + 1}</p>
                {event && <p className="mt-2 text-xs text-cyan-100">{event.event}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;