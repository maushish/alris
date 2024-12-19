'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StopCircle, TrendingUp, PieChart, History } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

// This would come from your backend in a real application
const mockData = {
  totalValue: 1000,
  growth: 2.5,
  allocation: [
    { name: 'Raydium LP Pool', percentage: 40, value: 400 },
    { name: 'Orca Whirlpool', percentage: 30, value: 300 },
    { name: 'Trading Position', percentage: 30, value: 300 },
  ],
  recentTransactions: [
    { id: 1, type: 'MOVE', description: 'Moved 10 USDC to Raydium LP Pool', timestamp: '2 mins ago' },
    { id: 2, type: 'SWAP', description: 'Swapped 5 USDC for SOL', timestamp: '5 mins ago' },
    { id: 3, type: 'YIELD', description: 'Collected 0.5 USDC yield from Orca', timestamp: '10 mins ago' },
    { id: 4, type: 'MOVE', description: 'Moved 15 USDC to Orca Whirlpool', timestamp: '15 mins ago' },
  ]
}

export function DashboardView() {
  const handleStopStrategy = () => {
    // Implement strategy cancellation logic
    console.log('Strategy stopped')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Portfolio Overview */}
      <Card className="bg-[#111218] border-blue-900/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-white">Portfolio Overview</CardTitle>
          <Button 
            variant="destructive" 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleStopStrategy}
          >
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Strategy
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-blue-100/70">Total Value</p>
                <p className="text-2xl font-bold text-white">${mockData.totalValue.toLocaleString()}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-blue-100/70">Growth</p>
                <p className="text-2xl font-bold text-green-500">
                  +{mockData.growth}%
                  <TrendingUp className="inline ml-1 h-5 w-5" />
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Allocation */}
      <Card className="bg-[#111218] border-blue-900/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-white">Current Allocation</CardTitle>
            <PieChart className="h-4 w-4 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.allocation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{item.name}</span>
                  <span className="font-medium text-white">{item.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-blue-950">
                  <div 
                    className="h-full rounded-full bg-blue-600" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-blue-100/70">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="lg:col-span-2 bg-[#111218] border-blue-900/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-white">Recent Transactions</CardTitle>
            <History className="h-4 w-4 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {mockData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border border-blue-900/10 bg-blue-950/20 p-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">{transaction.description}</p>
                    <p className="text-xs text-blue-100/70">{transaction.timestamp}</p>
                  </div>
                  <span className="text-xs font-medium text-blue-400">
                    {transaction.type}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

