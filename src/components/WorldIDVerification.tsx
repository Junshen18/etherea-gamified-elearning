"use client";

import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
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
      {({ open }) => <p key="world-id-button" onClick={open}>Unverified with World ID</p>}
    </IDKitWidget>
  );
} 