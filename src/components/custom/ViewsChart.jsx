import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

export function ViewsChart({ data }) {
  /* const chartData = data.map((video) => ({
    name: video.title.slice(0, 20) + '...',
    views: video.views,
  })) */

  return (
    <Card className="w-1/2 p-4 ml-4">
      <h2 className="text-lg font-semibold mb-4">Video Views</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip />
          <Bar dataKey="views" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

