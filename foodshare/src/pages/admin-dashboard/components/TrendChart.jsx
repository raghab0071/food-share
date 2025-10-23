import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TrendChart = ({ title, data, type = 'line', color = '#2D5A27' }) => {
  const chartData = data || [
    { name: 'Jan', value: 120, donations: 45, matches: 38 },
    { name: 'Feb', value: 180, donations: 68, matches: 52 },
    { name: 'Mar', value: 240, donations: 89, matches: 71 },
    { name: 'Apr', value: 320, donations: 112, matches: 95 },
    { name: 'May', value: 280, donations: 98, matches: 82 },
    { name: 'Jun', value: 380, donations: 134, matches: 118 },
    { name: 'Jul', value: 420, donations: 156, matches: 142 },
    { name: 'Aug', value: 480, donations: 178, matches: 165 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-6">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
                <XAxis 
                  dataKey="name" 
                  stroke="#7F8C8D"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#7F8C8D"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color}
                  strokeWidth={3}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
                <XAxis 
                  dataKey="name" 
                  stroke="#7F8C8D"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#7F8C8D"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="donations" fill="#2D5A27" name="Donations" />
                <Bar dataKey="matches" fill="#7BA05B" name="Matches" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;