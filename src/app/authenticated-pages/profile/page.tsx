"use client";


import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import {
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import WorldIDVerification from "@/components/WorldIDVerification";

export default function Profile() {

  const [isCopied, setIsCopied] = useState(false);
  const { setShowDynamicUserProfile } = useDynamicContext();
  // Example wallet address - replace with actual user's wallet
  const walletAddress = localStorage.getItem("user_address") ?? "0x000000000000000000000000000000000000000";
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(
    -4
  )}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    console.log("Copied to clipboard", isCopied);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Etherea ID</h1>
          <Image
            src="/etherea-logo-icon.svg"
            alt="logo"
            className="h-8 w-8 animate-pulse"
            width={32}
            height={32}
          />
        </div>

        <div className="space-y-6">
          {/* Wallet Section */}
          <div className="rounded-xl flex flex-col justify-end bg-[url('/nft-1.png')] bg-cover bg-center bg-no-repeat overflow-hidden w-full h-[280px]">
            <div className="w-full h-1/2 flex flex-col bg-gradient-to-b from-transparent to-black pb-3 items-center justify-end">
              <div className="flex items-center gap-3" onClick={copyAddress}>
                <div className="rounded-full bg-blue-500/20 p-2">
                  <FaEthereum className="h-6 w-6 text-blue-400" />
                </div>
                <span className="font-mono text-gray-300">{shortAddress}</span>
              </div>
            </div>
          </div>

          <WorldIDVerification />

          {/* NFT Collection Preview */}
          <div className="rounded-lg bg-gray-700/50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              NFT Collection
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20  transition-transform hover:scale-105"
                >
                  <Image
                    src={`/nft-weapon-${i}.png`}
                    alt={`NFT ${i}`}
                    width={100}
                    height={100}
                    className="h-full w-full rounded-lg border-2 border-dashed border-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History Preview */}
          <div className="rounded-lg bg-gray-700/50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Recent Transactions
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-gray-800 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 p-2">
                      <FaEthereum className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Transfer</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-gray-300">
                    0.05 ETH
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="font-semibold w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
            onClick={() => setShowDynamicUserProfile(true)}
          >
            Open Dynamic User Profile!
          </button>
          <DynamicUserProfile />
        </div>
      </div>
    </div>
  );
}
