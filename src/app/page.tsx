import Image from 'next/image'
import { ArrowRight, Zap, Brain, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { Toaster } from "sonner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <Toaster />
      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
          {/* Logo */}
          <div className="w-[120px] h-[120px] relative mb-8">
            <Image
              src="/static/alris-modified.png"
              alt="Alris logo"
              width={120}
              height={120}
              priority
              className="invert"
            />
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Effortless Yield Optimization and Trading, Powered by AI
          </h1>
          <p className="text-xl text-blue-100/70 max-w-2xl">
            Maximize your DeFi returns with Alris – smart, automated, and seamless.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                Try Alris on Solana Testnet
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Waitlist Form */}
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-8 mt-24">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[#111218] border border-blue-900/20">
            <div className="p-3 rounded-full bg-blue-500/10 mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Automated Yield Optimization
            </h3>
            <p className="text-sm text-blue-100/70">
              AI reallocates funds to maximize returns in real-time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[#111218] border border-blue-900/20">
            <div className="p-3 rounded-full bg-blue-500/10 mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Smart Trading Strategies
            </h3>
            <p className="text-sm text-blue-100/70">
              Dynamic trading powered by AI insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[#111218] border border-blue-900/20">
            <div className="p-3 rounded-full bg-blue-500/10 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Secure & Reliable
            </h3>
            <p className="text-sm text-blue-100/70">
              Built on Solana with secure server wallets.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/20">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-sm text-blue-100/70">
            © 2024 Alris. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-blue-100/70 hover:text-blue-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-blue-100/70 hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

