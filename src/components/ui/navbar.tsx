'use client'

import { Wallet } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from "@/components/ui/button";

// Dynamically import the WalletMultiButton to avoid SSR issues
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function Navbar() {
  const { publicKey } = useWallet();

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

        <div className="wallet-adapter-button-trigger">
          <WalletMultiButtonDynamic>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Wallet className="w-4 h-4" />
              {publicKey 
                ? `${publicKey.toBase58().substring(0, 7)}...`
                : 'Connect Wallet'
              }
            </Button>
          </WalletMultiButtonDynamic>
        </div>
      </div>
    </nav>
  );
}