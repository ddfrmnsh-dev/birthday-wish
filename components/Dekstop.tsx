"use client";

import { useState } from "react";
import { apps, AppKey } from "@/lib/apps";
import Window from "@/components/Window";
import Dock from "@/components/Dock";
import MenuBar from "@/components/MenuBar";
import MobileNav from "@/components/MobileNav";
import { WindowState } from "@/lib/window";

export default function Dekstop() {
    const [activeApp, setActiveApp] = useState<AppKey>("gift");
    // const [windowState, setWindowState] = useState<WindowState>("open");
    const ActiveComponent = apps[activeApp].component;
    const [windowState, setWindowState] =
        useState<WindowState>("minimized");

    const closeWindow = () => {
        setWindowState("closing");
        setTimeout(() => {
            setWindowState("minimized");
        }, 250);
    };

    const minimizeWindow = () => {
        setWindowState("minimized");
    };

    const toggleMaximize = () => {
        setWindowState((s) =>
            s === "maximized" ? "open" : "maximized"
        );
    };

    const openApp = (key: AppKey) => {
        setActiveApp(key);
        setWindowState("open");
    };

    return (
        <main className="h-screen w-screen overflow-hidden bg-linear-to-br from-slate-900 to-slate-700 text-white relative">
            <MenuBar
                activeApp={activeApp}
                onSelect={setActiveApp}
            />
            <div className="pt-8 h-full relative">
                <div className="flex flex-col gap-2">
                    {/* looping icon */}
                    {(Object.keys(apps) as AppKey[]).map((key) => {
                        const app = apps[key];

                        return (
                            <button
                                key={key}
                                onClick={() => openApp(key)}
                                className="
        w-16
        flex flex-col items-center gap-1
        p-2 rounded-lg
        hover:bg-white/10
        transition
      "
                            >
                                {/* ICON */}
                                <div className="w-8 h-8 flex items-center justify-center text-xl">
                                    {app.icon}
                                </div>

                                {/* LABEL */}
                                <span className="text-[11px] leading-none opacity-80 text-center">
                                    {key}.exe
                                </span>
                            </button>
                        );
                    })}
                </div>

                {windowState !== "minimized" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <Window
                                title={apps[activeApp].title}
                                state={windowState}
                                onClose={closeWindow}
                                onMinimize={minimizeWindow}
                                onToggleMaximize={toggleMaximize}
                            >
                                <ActiveComponent />
                            </Window>
                        </div>
                    </div>
                )}

            </div>

            <Dock
                onSelect={setActiveApp}
                onRestore={() => setWindowState("open")}
            />
            {/* <MobileNav onSelect={setActiveApp} /> */}
        </main>
    );
}
