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
      app_id="app_staging_ef753df76f3729f0f548c0dcb1ac96f4"
      action="testing-action"
      onSuccess={onSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => 
        <div className=" relative flex flex-col items-center justify-center bg-white rounded-lg p-4">
            <p key="world-id-button" onClick={open}>Unverified with World ID</p>
            <Image src="/worldID.svg" alt="Worldcoin" width={40} height={40} className="absolute opacity-15"/>
        </div>
      }
    </IDKitWidget>
  );
} 