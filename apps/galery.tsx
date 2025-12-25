"use client";

import { useEffect, useRef, useState } from "react";
import { Edu_SA_Beginner } from "next/font/google";

const eduFont = Edu_SA_Beginner({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const ITEMS_PER_PAGE = 8;

type MediaType = "photo" | "video";

const photos = [
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500266/WhatsApp_Image_2025-12-23_at_21.17.04_zjtkvi.jpg",
        caption: "Kemana ini kitaa? 💕",
        date: "23 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500266/WhatsApp_Image_2025-12-23_at_21.18.37_im4sli.jpg",
        caption: "Holiday Time 🌴",
        date: "20 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500272/WhatsApp_Image_2025-12-23_at_21.19.21_yxltla.jpg",
        caption: "Smile 😊",
        date: "15 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500269/WhatsApp_Image_2025-12-23_at_21.19.58_x4fyb6.jpg",
        caption: "Sweet Moment ✨",
        date: "10 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1766500275/WhatsApp_Video_2025-12-23_at_21.25.25_o1pbwm.mp4",
        caption: "Sweet Moment ✨",
        date: "10 Dec 2025",
        type: "video",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500268/WhatsApp_Image_2025-12-23_at_21.20.50_tkf4yn.jpg",
        caption: "Kemana ini kitaa? 💕",
        date: "23 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500265/WhatsApp_Image_2025-12-23_at_21.24.09_ivpumf.jpg",
        caption: "Holiday Time 🌴",
        date: "20 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1766500273/WhatsApp_Video_2025-12-23_at_21.24.40_sawqdz.mp4",
        caption: "Smile 😊",
        date: "15 Dec 2025",
        type: "video",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/image/upload/v1766500268/WhatsApp_Image_2025-12-23_at_21.23.40_zyy2hk.jpg",
        caption: "Sweet Moment ✨",
        date: "10 Dec 2025",
        type: "photo",
    },
    {
        src: "https://res.cloudinary.com/dzdypgkvu/video/upload/v1766500285/WhatsApp_Video_2025-12-23_at_21.21.39_uv8jde.mp4",
        caption: "Sweet Moment ✨",
        date: "10 Dec 2025",
        type: "video",
    },
];

export default function GaleryApp() {
    const [selected, setSelected] = useState<
        (typeof photos)[number] | null
    >(null);

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    /* ▶️ Play music saat galeri dibuka */
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.6;
            audioRef.current.play().catch(() => { });
        }
    }, []);

    /* 🔉 Volume ducking */
    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = selected ? 0.3 : 0.6;
    }, [selected]);

    const visiblePhotos = photos.slice(0, visibleCount);
    const hasMore = visibleCount < photos.length;

    return (
        <div className="space-y-4 relative">
            <h1 className="text-lg font-semibold text-center">
                📸 Ayuns Recap 2025
            </h1>

            {/* 🎵 BACKGROUND MUSIC */}
            <audio
                ref={audioRef}
                src="https://res.cloudinary.com/dzdypgkvu/video/upload/v1766642774/7._Jackson_5_-_I_Want_You_Back_-_Joel_Gustafsson_lm1ibi.mp3"
                loop
            />

            {/* === THUMBNAIL GRID === */}
            <div
                className="
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
          gap-3
        "
            >
                {visiblePhotos.map((photo, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(photo)}
                        className="
              aspect-square
              overflow-hidden
              rounded-md
              bg-white/10
              hover:scale-105
              transition
            "
                    >
                        {photo.type === "video" ? (
                            <video
                                src={photo.src}
                                className="w-full h-full object-cover"
                                muted
                            />
                        ) : (
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* === LOAD MORE === */}
            {hasMore && (
                <div className="flex justify-center pt-2">
                    <button
                        onClick={() =>
                            setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                        }
                        className="
              px-4 py-2 rounded-md
              bg-white/10 hover:bg-white/20
              transition text-sm
            "
                    >
                        Load More 📂
                    </button>
                </div>
            )}

            {/* === POPUP POLAROID === */}
            {selected && (
                <div
                    className="
            fixed inset-0 z-50
            bg-black/60 backdrop-blur-sm
            flex items-center justify-center
          "
                    onClick={() => setSelected(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
              bg-white text-black
              p-4 pb-6
              rounded-sm
              w-64
              animate-scale-in
            "
                    >
                        {/* MEDIA */}
                        <div className="overflow-hidden">
                            {selected.type === "video" ? (
                                <video
                                    src={selected.src}
                                    controls
                                    autoPlay
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <img
                                    src={selected.src}
                                    alt={selected.caption}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                        </div>

                        {/* CAPTION */}
                        <p
                            className={`
                mt-4 text-sm text-center
                ${eduFont.className}
              `}
                        >
                            {selected.caption}
                        </p>

                        <p className="mt-1 text-[10px] text-center opacity-60 italic">
                            {selected.date}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}