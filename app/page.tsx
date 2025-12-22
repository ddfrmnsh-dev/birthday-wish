"use client";

import { useEffect, useState } from "react";
import BootLoader from "@/components/BootLoader";
import LoginScreen from "@/components/LoginScreen";
import Desktop from "@/components/Dekstop";

type Stage = "boot" | "login" | "desktop";

export default function Page() {
  const [stage, setStage] = useState<Stage>("boot");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (stage === "boot") return <BootLoader />;
  if (stage === "login")
    return <LoginScreen onSuccess={() => setStage("desktop")} />;

  return <Desktop />;
}
