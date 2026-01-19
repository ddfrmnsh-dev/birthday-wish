"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
    id: string;
    title: string;
    artist: string;
    duration: string; // display only
    src: string; // audio url
    cover?: string; // optional
};

const dummyTracks: Track[] = [
    {
        id: "t1",
        title: "Gustas Tu",
        artist: "GFRIEND",
        duration: "04:11",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748874/%EC%97%AC%EC%9E%90%EC%B9%9C%EA%B5%AC_GFRIEND_-_%EC%98%A4%EB%8A%98%EB%B6%80%ED%84%B0_%EC%9A%B0%EB%A6%AC%EB%8A%94_Me_gustas_tu_MV_b8ckij.mp3",
    },
    {
        id: "t2",
        title: "Dream High",
        artist: "Various Artists",
        duration: "03:48",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748873/Dream_High_troqnw.mp3",
    },
    {
        id: "t3",
        title: "Lion Heart",
        artist: "Girls' Generation",
        duration: "05:36",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748867/Girls_Generation_%EC%86%8C%EB%85%80%EC%8B%9C%EB%8C%80_Lion_Heart_MV_oxgwis.mp3",
    },
    {
        id: "t4",
        title: "Umbrella",
        artist: "Epik High",
        duration: "05:09",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748865/Epik_high_%EC%97%90%ED%94%BD%ED%95%98%EC%9D%B4_-_Umbrella_Feat._Younha_%EC%9A%B0%EC%82%B0_bvr53a.mp3",
    },
    {
        id: "t5",
        title: "Aloha",
        artist: "Jo Jung Suk",
        duration: "04:04",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748864/Aloha_%EC%95%84%EB%A1%9C%ED%95%98_-_Jo_Jung_Suk_%EC%A1%B0%EC%A0%95%EC%84%9D_Hospital_Playlist_%EC%8A%AC%EA%B8%B0%EB%A1%9C%EC%9A%B4_%EC%9D%98%EC%82%AC%EC%83%9D%ED%99%9C_OST_Part_3_Lyrics_%EA%B0%80%EC%82%AC_HanRomEng_hzjpfo.mp3",
    },
    {
        id: "t6",
        title: "Gee",
        artist: "Girls' Generation",
        duration: "04:00",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748864/Girls_Generation_%EC%86%8C%EB%85%80%EC%8B%9C%EB%8C%80_Gee_MV_nkjif6.mp3",
    },
    {
        id: "t7",
        title: "Dream",
        artist: "BAEKHYUN & Suzy",
        duration: "03:50",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748862/MV_%EC%88%98%EC%A7%80_Suzy_%EB%B0%B1%ED%98%84_BAEKHYUN_-_Dream_nrce8e.mp3",
    },
    {
        id: "t8",
        title: "What is Love",
        artist: "TWICE",
        duration: "03:43",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748862/TWICE_What_is_Love__MV_otbofo.mp3",
    },
    {
        id: "t9",
        title: "Loveable",
        artist: "Kim Jong Kook",
        duration: "04:29",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748857/%EC%82%AC%EB%9E%91%EC%8A%A4%EB%9F%AC%EC%9B%8C_qgupxs.mp3",
    },
    {
        id: "t10",
        title: "Love Battery",
        artist: "Hong Jin Young",
        duration: "03:26",
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1768748851/YTDown.com_YouTube_Media_pVii2t2u49I_008_128k_nkawvr.mp4",
    },
];

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function formatTime(sec: number) {
    if (!Number.isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MusicApp() {
    const tracks = useMemo(() => dummyTracks, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const active = tracks[activeIndex];

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    const play = async () => {
        const el = audioRef.current;
        if (!el) return;
        try {
            await el.play();
            setIsPlaying(true);
        } catch {
            // autoplay policy / user gesture issues handled by requiring click
            setIsPlaying(false);
        }
    };

    const pause = () => {
        const el = audioRef.current;
        if (!el) return;
        el.pause();
        setIsPlaying(false);
    };

    const toggle = () => {
        if (isPlaying) pause();
        else play();
    };

    const next = () => {
        setActiveIndex((i) => (i + 1) % tracks.length);
    };

    const prev = () => {
        setActiveIndex((i) => (i - 1 + tracks.length) % tracks.length);
    };

    const selectTrack = (idx: number) => {
        setActiveIndex(idx);
    };

    // When track changes: load + optionally keep playing
    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;

        el.src = active.src;
        el.load();
        setCurrent(0);
        setDuration(0);

        // if currently playing, continue playing next track
        if (isPlaying) {
            // give the browser a tick
            setTimeout(() => {
                play();
            }, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    // Sync volume
    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        el.volume = clamp(volume, 0, 1);
    }, [volume]);

    const onTimeUpdate = () => {
        const el = audioRef.current;
        if (!el) return;
        setCurrent(el.currentTime || 0);
    };

    const onLoaded = () => {
        const el = audioRef.current;
        if (!el) return;
        setDuration(el.duration || 0);
    };

    const onEnded = () => {
        // auto-next
        next();
    };

    const seek = (pct: number) => {
        const el = audioRef.current;
        if (!el || !duration) return;
        el.currentTime = clamp(pct, 0, 1) * duration;
    };

    const progressPct = duration ? (current / duration) * 100 : 0;

    return (
        <div className="space-y-4">
            {/* hidden audio engine */}
            <audio
                ref={audioRef}
                src={active.src}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoaded}
                onEnded={onEnded}
            />

            {/* Header / Now Playing */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-lg">
                    🎵
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{active.title}</p>
                    <p className="text-xs opacity-70 truncate">{active.artist}</p>
                </div>
                <div className="ml-auto text-xs opacity-70 tabular-nums">
                    {formatTime(current)} / {formatTime(duration)}
                </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
                <div
                    className="h-2 rounded-full bg-white/10 border border-white/10 overflow-hidden cursor-pointer"
                    onClick={(e) => {
                        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                        const pct = (e.clientX - rect.left) / rect.width;
                        seek(pct);
                    }}
                >
                    <div
                        className="h-full bg-white/30"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>

                {/* Controls row */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={prev}
                        className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-xs"
                        aria-label="Previous"
                        title="Previous"
                    >
                        ⏮
                    </button>

                    <button
                        onClick={toggle}
                        className="px-4 py-1.5 rounded-md bg-white/15 hover:bg-white/25 transition text-xs font-medium"
                        aria-label="Play/Pause"
                        title="Play/Pause"
                    >
                        {isPlaying ? "Pause ⏸" : "Play ▶"}
                    </button>

                    <button
                        onClick={next}
                        className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-xs"
                        aria-label="Next"
                        title="Next"
                    >
                        ⏭
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                        <span className="text-xs opacity-70">🔊</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-24 accent-white/70"
                        />
                    </div>
                </div>
            </div>

            {/* Playlist */}
            <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
                    Playlist
                </div>

                <div className="max-h-56 overflow-auto">
                    {tracks.map((t, idx) => {
                        const activeRow = idx === activeIndex;
                        return (
                            <button
                                key={t.id}
                                onClick={() => selectTrack(idx)}
                                className={`
                  w-full text-left px-3 py-2
                  flex items-center gap-3
                  transition
                  ${activeRow ? "bg-white/10" : "hover:bg-white/5"}
                `}
                            >
                                <div className="w-6 text-center text-sm opacity-90">
                                    {activeRow ? (isPlaying ? "🔊" : "⏸") : "♪"}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm truncate">{t.title}</p>
                                    <p className="text-xs opacity-60 truncate">{t.artist}</p>
                                </div>

                                <div className="text-xs opacity-60 tabular-nums">
                                    {t.duration}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
