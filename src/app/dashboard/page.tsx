'use client'

import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Settings, BotIcon as Robot } from 'lucide-react';
import { useState } from "react";
import { StrategyModal } from "@/components/ui/strategy-modal";
import { DashboardView } from "@/components/ui/dashboard-view";

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [isStrategyActive, setIsStrategyActive] = useState(false);

  const handleStrategyComplete = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleStartStrategy = () => {
    setIsStrategyActive(true);
  };

  const steps = [
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Link your Solana wallet and start exploring.",
      action: "Connect Wallet",
      onClick: () => setCurrentStep(prev => Math.min(prev + 1, 3))
    },
    {
      icon: Settings,
      title: "Set Your Preferences",
      description: "Choose your strategy and risk level.",
      action: "Configure",
      onClick: () => setShowStrategyModal(true)
    },
    {
      icon: Robot,
      title: "Automated Optimization",
      description: "Sit back as Alris intelligently manages your assets.",
      action: "Start",
      onClick: handleStartStrategy
    }
  ];

  if (isStrategyActive) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <Navbar />
        <main className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8 text-white">Strategy Dashboard</h1>
          <DashboardView />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Get Started with Alris</h1>
          
          <div className="grid gap-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;

              return (
<Card
  key={index}
  className={`bg-[#111218] border-blue-900/20 ${
    isActive ? 'ring-2 ring-blue-500' : ''
  }`}
>
  <CardContent className="flex items-center gap-6 p-6">
    <div className={`p-3 rounded-full ${
      isCompleted ? 'bg-blue-500' : 'bg-blue-500/10'
    }`}>
      <StepIcon className={`w-6 h-6 ${
        isCompleted ? 'text-white' : 'text-blue-400'
      }`} />
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-1 text-white">{step.title}</h3>
      <p className="text-blue-100/70">{step.description}</p>
    </div>
    {isActive && (
      <Button
        className="bg-blue-600 hover:bg-blue-700"
        onClick={step.onClick}
      >
        {step.action}
      </Button>
    )}
    {isCompleted && (
      <div className="text-blue-400">Completed</div>
    )}
  </CardContent>
</Card>
              );
            })}
          </div>
        </div>
      </main>

      <StrategyModal 
        open={showStrategyModal}
        onOpenChange={setShowStrategyModal}
        onComplete={handleStrategyComplete}
      />
    </div>
  );
}

