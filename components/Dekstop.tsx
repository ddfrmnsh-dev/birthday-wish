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
        useState<WindowState>("open");

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


    return (
        <main className="h-screen w-screen overflow-hidden bg-linear-to-br from-slate-900 to-slate-700 text-white relative">
            <MenuBar
                activeApp={activeApp}
                onSelect={setActiveApp}
            />

            <div className="pt-8 h-full flex items-center justify-center">
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

            <Dock
                onSelect={setActiveApp}
                onRestore={() => setWindowState("open")}
            />
            {/* <MobileNav onSelect={setActiveApp} /> */}
        </main>
    );
}
