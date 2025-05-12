"use client";
import React, { useState } from "react";
import UntilStartTimer from "./UntilStartTimer";
import OpenBankingWindow from "@/components/SecurePopUp";
import Link from "next/link";
import { Button } from "./ui/button";

const StartTestBtn = ({
  id,
  startDate,
  endDate,
  maxAttempts,
  userAttempts,
}) => {
  const [timeIsClose, setTimeIsClose] = useState(false);
  console.log(timeIsClose, maxAttempts, userAttempts);

  return (
    <div className="flex gap-4 items-center">
      <UntilStartTimer
        start={startDate}
        end={endDate}
        className="p-2 rounded"
        textClassName="font-medium"
        setReached={(e) => setTimeIsClose(e)}
        tSec={300}
      />

      {process.env.NEXT_PUBLIC_DEV === "production" ? (
        <OpenBankingWindow
          url={`/test/${id}`}
          isDisabled={parseInt(maxAttempts) <= parseInt(userAttempts)}
          isUserAutherised={parseInt(maxAttempts) > parseInt(userAttempts) && timeIsClose}
        />
      ) : (
        <Button asChild>
          <Link href={`/test/${id}`}>Continue</Link>
        </Button>
      )}
    </div>
  );
};

export default StartTestBtn;
