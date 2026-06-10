function Analytics() {
  const stats = [
    { label: 'Completion rate', value: '78%' },
    { label: 'Tasks done this week', value: '14' },
    { label: 'Average per day', value: '5' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-blue-200">Progress insights</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Analytics</h1>
        <p className="mt-2 text-slate-300">
          See how your habits are shaping up with a simple overview of your most important metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-300">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <h2 className="text-lg font-semibold text-white">Focus zones</h2>
        <div className="mt-4 space-y-3">
          {[
            ['Morning', '82%'],
            ['Afternoon', '64%'],
            ['Evening', '58%'],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm text-slate-300">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: value }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;