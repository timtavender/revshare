import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RevenueShareCalculator() {
  const [fixedFee, setFixedFee] = useState(2000);
  const [duration, setDuration] = useState(6);
  const [revSharePercent, setRevSharePercent] = useState(15);
  const [profitSharePercent, setProfitSharePercent] = useState(30);
  const [initialRevenue, setInitialRevenue] = useState(10000);
  const [growthRate, setGrowthRate] = useState(10);
  const [profitMargin, setProfitMargin] = useState(40);
  const [results, setResults] = useState([]);

  const calculate = () => {
    let data = [];
    let monthlyRevenue = initialRevenue;
    let totalFixed = fixedFee * duration;
    let totalRevShare = 0;
    let totalProfitShare = 0;
    let totalHybrid = 0;

    for (let month = 1; month <= duration; month++) {
      const profit = (monthlyRevenue * profitMargin) / 100;
      const revShareEarned = (monthlyRevenue * revSharePercent) / 100;
      const profitShareEarned = (profit * profitSharePercent) / 100;
      const hybridEarned = fixedFee + revShareEarned;

      totalRevShare += revShareEarned;
      totalProfitShare += profitShareEarned;
      totalHybrid += hybridEarned;

      data.push({
        month: `Month ${month}`,
        "Fixed Fee": fixedFee * month,
        "Rev Share": totalRevShare.toFixed(2),
        "Profit Share": totalProfitShare.toFixed(2),
        "Hybrid (Fee + Rev Share)": totalHybrid.toFixed(2)
      });

      monthlyRevenue *= 1 + growthRate / 100;
    }

    setResults(data);
  };

  return (
    <div className="p-6 space-y-6 bg-white text-black">
      <h1 className="text-2xl font-bold text-center">Are you curious what you could earn as a Partner? Try the Fixed Fee vs Revenue Share Calculator</h1>

      <Card>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div>
            <label>Fixed Monthly Fee (£)</label>
            <Input type="number" value={fixedFee} onChange={e => setFixedFee(Number(e.target.value))} />
          </div>
          <div>
            <label>Duration (months)</label>
            <Input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} />
          </div>
          <div>
            <label>Revenue Share %</label>
            <Input type="number" value={revSharePercent} onChange={e => setRevSharePercent(Number(e.target.value))} />
          </div>
          <div>
            <label>Profit Share %</label>
            <Input type="number" value={profitSharePercent} onChange={e => setProfitSharePercent(Number(e.target.value))} />
          </div>
          <div>
            <label>Profit Margin % (for profit share)</label>
            <Input type="number" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} />
          </div>
          <div>
            <label>Starting Monthly Revenue (£)</label>
            <Input type="number" value={initialRevenue} onChange={e => setInitialRevenue(Number(e.target.value))} />
          </div>
          <div>
            <label>Monthly Revenue Growth %</label>
            <Input type="number" value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))} />
          </div>
          <div className="flex items-end">
            <Button onClick={calculate}>Calculate</Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Earnings Comparison</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={results}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Fixed Fee" stroke="#8884d8" />
                <Line type="monotone" dataKey="Rev Share" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Profit Share" stroke="#ffc658" />
                <Line type="monotone" dataKey="Hybrid (Fee + Rev Share)" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
