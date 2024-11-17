"use client";

import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WorldIDVerification() {
  const router = useRouter();

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed.");
    }

    router.push('/');
  };

  const onSuccess = (result: ISuccessResult) => {
    console.log("Success:", result);
    localStorage.setItem("worldID_verified", "true");
  };

  return (
    <IDKitWidget
      app_id="app_280a887139487136d1ab578475a8130e"
      action="verify-action"
      onSuccess={onSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => 
        <div className=" relative flex flex-col items-center justify-center bg-white rounded-lg p-4 cursor-pointer">
            <p key="world-id-button" className="font-semibold" onClick={open}>Unverified with World ID</p>
            <Image src="/worldID.svg" alt="Worldcoin" width={40} height={40} className="absolute opacity-15"/>
        </div>
      }
    </IDKitWidget>
  );
} 