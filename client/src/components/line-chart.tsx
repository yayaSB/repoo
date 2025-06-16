// components/LineChart.tsx
"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type DataPoint = {
  date: string
  value: number
}

type ChartData = {
  [key: string]: {
    monthly: DataPoint[]
    yearly: DataPoint[]
  }
}

type LineChartProps = {
  title: string
  chartData: ChartData
}

export default function LineChart({ title, chartData }: LineChartProps) {
  const types = Object.keys(chartData) as Array<keyof typeof chartData>
  const [selectedType, setSelectedType] = useState<keyof typeof chartData>(types[0])
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "yearly">("yearly")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const rawData: DataPoint[] = chartData[selectedType][selectedPeriod]
  const data = [...rawData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const CustomTooltip = ({ active, payload, coordinate }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="z-50 absolute"
          style={{
            top: coordinate.y - 40,
            left: coordinate.x,
            transform: "translateX(-50%)",
          }}
        >
          <div className="bg-[#081C49] text-white text-xs px-2 py-1 rounded-md text-center">
            {`${payload[0].value}%`}
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#081C49]" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white w-full mt-2 px-6 mx-auto rounded-xl shadow-[0_3px_5px_rgba(0,0,0,0.1)] overflow-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 pt-4">
        <h2 className="font-semibold text-[20px] leading-[100%] text-gray-800">{title}</h2>

        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 pr-6 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as keyof typeof chartData)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-700">
              <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="bg-[#F7F9FA] h-9 flex items-center rounded-md overflow-hidden">
            <button
              onClick={() => setSelectedPeriod("monthly")}
              className={`px-5 py-1 text-xs transition-all ${
                selectedPeriod === "monthly" ? "bg-white text-gray-700 shadow" : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPeriod("yearly")}
              className={`px-5 py-1 text-xs transition-all ${
                selectedPeriod === "yearly" ? "bg-white text-gray-700 shadow" : "text-gray-500"
              }`}
            >
              Yearly
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-md w-36 p-1 z-10">
              <ul className="space-y-1">
                <li className="cursor-pointer text-xs text-gray-700 hover:bg-gray-50 p-1 rounded">1</li>
                <li className="cursor-pointer text-xs text-gray-700 hover:bg-gray-50 p-1 rounded">2</li>
                <li className="cursor-pointer text-xs text-gray-700 hover:bg-gray-50 p-1 rounded">3</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="pb-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="#EBEDEE" strokeDasharray="0" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#888" }} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#888", dx: -4 }}
              width={30}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#94A3B8", strokeWidth: 1, strokeDasharray: "5 5" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1C5DF3"
              strokeWidth={2}
              fill="#F7F9FF"
              activeDot={{
                r: 5,
                fill: "#081C49",
                stroke: "#fff",
                strokeWidth: 1.5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
