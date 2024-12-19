'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from 'lucide-react'

interface StrategyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}

export function StrategyModal({ open, onOpenChange, onComplete }: StrategyModalProps) {
  const [strategy, setStrategy] = useState("yield")
  const [riskLevel, setRiskLevel] = useState(50)
  const [stopLoss, setStopLoss] = useState("10")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
    onOpenChange(false)
  }

  const getRiskLabel = (value: number) => {
    if (value <= 33) return "Low"
    if (value <= 66) return "Medium"
    return "High"
  }

  const getRiskDescription = (value: number) => {
    if (value <= 33) return "Focus on stablecoins and low-risk yield pools."
    if (value <= 66) return "Include moderate risk pools with limited exposure to volatile assets."
    return "Emphasize high-yield pools and aggressive trading strategies for maximum returns."
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#111218] text-white border-blue-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Your Strategy and Risk Profile</DialogTitle>
          <DialogDescription className="text-blue-100/70">
            Choose how Alris will manage your portfolio to optimize returns based on your preferences.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8 pt-4">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Market Strategy</Label>
            <RadioGroup value={strategy} onValueChange={setStrategy} className="space-y-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="yield" id="yield" className="mt-1 border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <div>
                  <Label htmlFor="yield" className="text-base font-medium">Yield Optimization</Label>
                  <p className="text-sm text-blue-100/70">
                    Maximize returns by reallocating funds dynamically between high-yield pools.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="trading" id="trading" className="mt-1 border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <div>
                  <Label htmlFor="trading" className="text-base font-medium">Trading Strategy</Label>
                  <p className="text-sm text-blue-100/70">
                    Engage in intelligent trading based on market trends to capture gains.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="hybrid" id="hybrid" className="mt-1 border-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <div>
                  <Label htmlFor="hybrid" className="text-base font-medium">Hybrid Strategy</Label>
                  <p className="text-sm text-blue-100/70">
                    Combine yield optimization and trading for a balanced approach.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Risk Level</Label>
              <span className="text-sm font-medium text-blue-400">
                {getRiskLabel(riskLevel)}
              </span>
            </div>
            <Slider
  value={[riskLevel]}
  onValueChange={([value]) => setRiskLevel(value)}
  max={100}
  step={1}
  className="[&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-600 [&_[role=slider]]:ring-offset-background [&_[role=slider]]:hover:border-blue-700 [&>.bg-primary]:bg-blue-600 [&_[role=track]]:bg-white/20 [&_[role=range]]:bg-blue-600"
/>
            <p className="text-sm text-blue-100/70">
              {getRiskDescription(riskLevel)}
            </p>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold" htmlFor="stop-loss">
              Stop-Loss Threshold
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="stop-loss"
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                min="1"
                max="50"
                className="bg-background/5 border-background/10"
              />
              <span className="text-blue-100/70">%</span>
            </div>
            <p className="text-sm text-blue-100/70">
              Maximum acceptable loss before automatically closing positions.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

