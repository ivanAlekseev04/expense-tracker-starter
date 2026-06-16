import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1'];

function buildChartData(transactions) {
  const totals = {};
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    totals[t.category] = (totals[t.category] ?? 0) + t.amount;
  }
  return Object.entries(totals).map(([name, value]) => ({ name, value }));
}

export default function SpendingChart({ transactions }) {
  const data = buildChartData(transactions);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expense data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 13 }} />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="value" name="Amount" radius={[3, 3, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
