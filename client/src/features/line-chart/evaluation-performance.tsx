import LineChart from "@/components/line-chart"
import { performanceData } from "@/constants/performance-data"

export default function EvaluationPerformance() {
  return (
    <LineChart
      title="Évolution des performances"
      chartData={performanceData}
    />
  )
}
