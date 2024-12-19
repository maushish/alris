'use client'

import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Implement actual wallet connection logic here
    setIsConnected(true);
  };

  return (
    <nav className="border-b border-blue-900/20 bg-[#0A0B0F]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/static/alris-modified.png?height=32&width=32"
            alt="Alris logo"
            width={32}
            height={32}
            className="invert"
          />
          <span className="font-semibold text-white">Alris</span>
        </Link>

        <Button
          onClick={handleConnect}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Wallet className="w-4 h-4" />
          {isConnected ? "Connected" : "Connect Wallet"}
        </Button>
      </div>
    </nav>
  );
}

