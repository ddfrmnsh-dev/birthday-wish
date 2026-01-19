"use client";

import { useMemo, useState } from "react";

type Clip = {
    id: string;
    title: string;
    date: string;
    desc: string;
    src: string; // mp4 url
    duration: string;
};

const dummyClips: Clip[] = [
    {
        id: "v1",
        title: "Yapping Episode 1",
        date: "23 Dec 2025",
        desc: "Random talk + cerita lucu yang terjadi hari itu 😭",
        src: "https://drive.google.com/file/d/1FzOieV1AhJNwSyzFnUYDZ7eM2fQwbDzy/view?usp=sharing",
        duration: "00:19",
    },
];

export default function YappinngAppss() {
    const clips = useMemo(() => dummyClips, []);
    const [activeId, setActiveId] = useState(clips[0]?.id);
    const active = clips.find((c) => c.id === activeId) ?? clips[0];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">📺 Yapping</h1>
                <span className="text-xs opacity-60">
                    {clips.length} videos
                </span>
            </div>

            {/* Layout: video + sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
                {/* MAIN */}
                <div className="space-y-3">
                    {/* Player */}
                    <div className="rounded-lg overflow-hidden border border-white/10 bg-black">
                        <video
                            key={active.src}
                            src={active.src}
                            controls
                            className="w-full aspect-video"
                        />
                    </div>

                    {/* Title + meta */}
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">{active.title}</p>
                        <p className="text-xs opacity-70">{active.date}</p>
                        <p className="text-sm opacity-80 leading-relaxed">
                            {active.desc}
                        </p>
                    </div>

                    {/* Actions */}
                    {/* <div className="flex items-center gap-2 pt-1">
                        <button className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-xs">
                            👍 Like
                        </button>
                        <button className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-xs">
                            💬 Comment
                        </button>
                        <button className="ml-auto px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-xs">
                            🔗 Share
                        </button>
                    </div> */}
                </div>

                {/* SIDEBAR (Recommended) */}
                <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
                        Recommended
                    </div>

                    <div className="max-h-72 overflow-auto">
                        {clips.map((c) => {
                            const isActive = c.id === activeId;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setActiveId(c.id)}
                                    className={`
                    w-full text-left p-3
                    flex gap-3 items-start
                    transition
                    ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                  `}
                                >
                                    {/* Tiny thumb */}
                                    <div className="w-20 aspect-video rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-xs opacity-80">
                                        ▶ {c.duration}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium truncate">
                                            {c.title}
                                        </p>
                                        <p className="text-[11px] opacity-60 truncate">
                                            {c.date}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile hint */}
            <p className="text-[11px] opacity-60">
                *Tadinya tuh mau banyak ini cuman 1 video, tapi yaudahlah yaa wkwk
                gapapa deh hehe.
            </p>
        </div>
    );
}
