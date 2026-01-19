"use client";

import { useMemo, useRef, useState } from "react";

type Clip = {
    id: string;
    title: string;
    date: string;
    desc: string;
    src: string; // direct mp4 (Cloudinary)
    duration: string;
};

const dummyClips: Clip[] = [
    {
        id: "v1",
        title: "belum nemu judulnya",
        date: "23 Dec 2025",
        desc: "yaa moga moga di tonton sampe habis wkwk, btw volumenya di up yaa biar kedengeran hehe",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768837645/Win_20260114_20_09_47_Pro-upvolume_kxxyue.mp4",
        duration: "5:22",
    },
];

export default function YappinngApp() {
    const clips = useMemo(() => dummyClips, []);
    const [activeId, setActiveId] = useState(clips[0]?.id);
    const active = clips.find((c) => c.id === activeId) ?? clips[0];

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const selectClip = (id: string) => {
        setActiveId(id);
        // UX: ganti video lalu auto play (kalau user sudah pernah play sebelumnya)
        setTimeout(() => {
            videoRef.current?.play().catch(() => { });
        }, 0);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">📺 Yapping</h1>
                <span className="text-xs opacity-60">{clips.length} videos</span>
            </div>

            {/* Player FULL */}
            <div className="rounded-lg overflow-hidden border border-white/10 bg-black">
                <video
                    ref={videoRef}
                    key={active.src}
                    src={active.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video"
                />
            </div>

            {/* Title + meta */}
            <div className="space-y-1">
                <p className="text-sm font-semibold">{active.title}</p>
                <p className="text-xs opacity-70">{active.date}</p>
                <p className="text-sm opacity-80 leading-relaxed">{active.desc}</p>
            </div>

            {/* List video BELOW desc */}
            <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
                    More videos
                </div>

                <div className="max-h-56 overflow-auto">
                    {clips.map((c) => {
                        const isActive = c.id === activeId;
                        return (
                            <button
                                key={c.id}
                                onClick={() => selectClip(c.id)}
                                className={`
                  w-full text-left p-3
                  flex gap-3 items-start
                  transition
                  ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                `}
                            >
                                {/* thumb placeholder */}
                                <div className="w-24 aspect-video rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-xs opacity-80 shrink-0">
                                    ▶ {c.duration}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium truncate">{c.title}</p>
                                    <p className="text-[11px] opacity-60 truncate">{c.date}</p>
                                </div>

                                {isActive && (
                                    <span className="ml-auto text-[11px] opacity-70">
                                        Now Playing
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Note */}
            <p className="text-[11px] opacity-60">
                *Tadinya tuh mau banyak ini cuman 1 video, tapi yaudahlah yaa wkwk
                gapapa deh hehe.
            </p>
        </div>
    );
}
