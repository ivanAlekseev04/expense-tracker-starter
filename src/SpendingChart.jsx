import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#a855f7",
    "#34d399",
    "#f87171",
    "#60a5fa",
    "#fbbf24",
    "#f472b6",
    "#2dd4bf",
];

function buildChartData(transactions) {
    const totals = {};
    for (const t of transactions) {
        if (t.type !== "expense") continue;
        totals[t.category] = (totals[t.category] ?? 0) + t.amount;
    }
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
}

export default function SpendingChart({ transactions }) {
    const data = buildChartData(transactions);

    return (
        <div className="spending-chart">
            <h2>Spending by Category</h2>
            <div className="chart-body">
                {data.length === 0 ? (
                    <p className="chart-empty">No expense data to display.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart
                            data={data}
                            margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#1f1f1f"
                            />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 13, fill: "#666" }}
                                axisLine={{ stroke: "#2a2a2a" }}
                                tickLine={false}
                            />
                            <YAxis
                                tickFormatter={(v) => `$${v}`}
                                tick={{ fontSize: 13, fill: "#666" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(value) => `$${value.toFixed(2)}`}
                                contentStyle={{
                                    background: "#1a1a1a",
                                    border: "1px solid #2a2a2a",
                                    borderRadius: "8px",
                                    color: "#f0f0f0",
                                }}
                                labelStyle={{ color: "#888" }}
                                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                            />
                            <Bar
                                dataKey="value"
                                name="Amount"
                                radius={[4, 4, 0, 0]}
                            >
                                {data.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
