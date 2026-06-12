import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const LABELS = ['Scrum', 'Carry', 'Speed', 'Defense', 'Work Rate', 'Set Piece']

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  animation: { duration: 350, easing: 'easeInOutQuart' },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111827',
      titleColor: '#F9FAFB',
      bodyColor: '#D1D5DB',
      padding: 10,
      cornerRadius: 6,
      callbacks: {
        label: ctx => `${ctx.label}: ${ctx.raw}/10`,
      },
    },
  },
  scales: {
    r: {
      min: 0,
      max: 10,
      ticks: { stepSize: 2, display: false },
      grid: { color: '#E5E7EB', lineWidth: 1 },
      angleLines: { color: '#E5E7EB', lineWidth: 1 },
      pointLabels: {
        font: { family: "'Barlow Condensed', sans-serif", size: 11, weight: '700' },
        color: '#6B7280',
      },
    },
  },
}

export default function RadarChart({ stats }) {
  const data = {
    labels: LABELS,
    datasets: [{
      data: stats,
      backgroundColor: 'rgba(230, 57, 70, 0.15)',
      borderColor: '#E63946',
      borderWidth: 2,
      pointBackgroundColor: '#E63946',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 5,
    }],
  }

  return (
    <div className="radar-wrap">
      <Radar data={data} options={OPTIONS} />
    </div>
  )
}
