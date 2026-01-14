import { useRef, useState, useEffect } from "react";

export default function CakesApp() {
    const [isLit, setIsLit] = useState(true);
    const [started, setStarted] = useState(false);
    const [cooldown, setCooldown] = useState(25);

    const [showForm, setShowForm] = useState(false);
    const [wish, setWish] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startCake = () => {
        setStarted(true);
        setCooldown(25);

        audioRef.current?.play();
    };

    const blowCandle = () => {
        setIsLit(false);
        setShowForm(true);
        audioRef.current?.pause();
    };

    // countdown
    useEffect(() => {
        if (!started || cooldown === 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [started, cooldown]);

    const submitWish = async () => {
        if (!wish.trim()) return;
        setShowForm(false);
        setSubmitted(true);

        await fetch("https://api.jsonbin.io/v3/b", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Access-Key": "$2a$10$FTU4uBJ1UE3T9tOlbqAyeO5bxLzY.s9t6saHjR5gls3XqjXhQXihW",
                "X-Collection-Id": "6967a144d0ea881f406b8b19",
                "X-Bin-Name": "wish-logs",
            },
            body: JSON.stringify({
                name: "ayuuunnss",
                text: wish,
                time: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
            }),
        });
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-lg font-semibold">Make a Wish Ayunns💗</h1>
            {/* AUDIO */}
            <audio
                ref={audioRef}
                src="https://res.cloudinary.com/dzdypgkvu/video/upload/v1766507786/hbd-korean-version_ld9w1n.mp3"
                loop
            />

            {!started ? (
                <button
                    onClick={startCake}
                    className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
                >
                    Open Cake 🎶
                </button>
            ) : (
                <>
                    {/* CAKE */}
                    <div className="relative h-24 flex items-end justify-center select-none">
                        <div className="text-7xl">🎂</div>
                        {isLit && (
                            <div className="absolute top-0 animate-pulse text-3xl">
                                🔥
                            </div>
                        )}
                    </div>

                    {/* TIUP BUTTON */}
                    {isLit && (
                        <button
                            onClick={blowCandle}
                            disabled={cooldown > 0}
                            className="
                px-4 py-2 rounded-md
                bg-white/10 hover:bg-white/20
                disabled:opacity-40
                transition
              "
                        >
                            {cooldown > 0
                                ? `Tunggu ${cooldown}s 🎵`
                                : "Tiup Lilin 💨"}
                        </button>
                    )}

                    {/* WISH FORM */}
                    {showForm && (
                        <div className="w-full space-y-3 animate-fade-in">
                            <textarea
                                value={wish}
                                onChange={(e) => setWish(e.target.value)}
                                placeholder="Tulis wish kamu di sini ✨"
                                className="
                  w-full p-2 rounded-md
                  bg-white/10 border border-white/20
                  text-sm resize-none
                "
                                rows={3}
                            />
                            <button
                                onClick={submitWish}
                                className="
                  w-full py-2 rounded-md
                  bg-white/20 hover:bg-white/30
                  transition
                "
                            >
                                Submit Wish 💌
                            </button>
                        </div>
                    )}

                    {/* FINAL MESSAGE */}
                    {submitted && (
                        <p className="text-sm font-medium text-center animate-fade-in">
                            🎉 Happy Birthday!
                            <br />
                            Semoga wish-mu terkabul ✨
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
