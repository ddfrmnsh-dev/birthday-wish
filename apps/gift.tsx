import { useState } from "react";

const prizes = [
    { label: "Watch", icon: "🎁", color: "#f472b6" },
    { label: "Shoes", icon: "🎁", color: "#60a5fa" },
    { label: "Tumbrl", icon: "🎁", color: "#f472b6" },
    { label: "Secret", icon: "🎁", color: "#60a5fa" },
    { label: "Adalah pokoknya!", icon: "🎁", color: "#f472b6" },
    { label: "Special karetnya 2!", icon: "🎁", color: "#60a5fa" },
];


export default function GiftApp() {
    const MAX_SPIN = 3;
    const sliceDeg = 360 / prizes.length;

    const [spinsLeft, setSpinsLeft] = useState(MAX_SPIN);
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    // const [result, setResult] = useState<string | null>(null);
    const [result, setResult] = useState<typeof prizes[number] | null>(null);
    const [finalIndex, setFinalIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const gradient = `conic-gradient(
  ${prizes
            .map(
                (p, i) =>
                    `${p.color} ${i * sliceDeg}deg ${(i + 1) * sliceDeg}deg`
            )
            .join(",")}
)`;
    const spin = () => {
        if (spinsLeft === 0 || isSpinning) return;

        setIsSpinning(true);
        setResult(null);

        const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));
        const randomDeg = Math.floor(Math.random() * 360);

        const totalRotation = extraSpins + randomDeg;

        setRotation((prev) => prev + totalRotation);

        setTimeout(() => {
            // ⬇️ ambil sudut akhir (ingat kita pakai -90deg di CSS)
            const finalDeg = (rotation + totalRotation) % 360;

            // geser supaya pointer jam 12
            const normalized = (360 - finalDeg + 90) % 360;

            const index = Math.floor(normalized / sliceDeg);

            // setResult(`${prizes[index].icon} ${prizes[index].label}`);
            setResult(prizes[index]);
            setSpinsLeft((prev) => prev - 1);
            setIsSpinning(false);
            setShowResult(true);
        }, 3000);
    };

    return (
        <div className="space-y-4 flex flex-col items-center">
            <h1 className="text-lg font-semibold">🎁 Gift Wheel</h1>
            <h4 className="text-sm font-semibold">Jangan lupa untuk di foto hadiahnyaaa! untuk di tukarkan ehehe</h4>

            {/* POINTER */}
            {/* POINTER */}
            <div className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl z-10">
                    🔻
                </div>

                {/* WHEEL */}
                <div
                    className="
      w-48 h-48 rounded-full
      border border-white/20
      relative
      transition-transform duration-[3000ms] ease-out
      shadow-lg
    "
                    style={{
                        transform: `rotate(${rotation - 90}deg)`,
                        background: gradient,
                    }}

                >
                    {prizes.map((prize, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 flex items-start justify-center"
                            style={{
                                transform: `rotate(${i * sliceDeg + sliceDeg / 2}deg)`,
                            }}
                        >
                            <div
                                className="mt-3 text-xl drop-shadow select-none"
                                style={{
                                    transform: `rotate(${-(i * sliceDeg + sliceDeg / 2)}deg)`,
                                }}
                            >
                                {prize.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <p className="text-sm opacity-80">
                Spin left: <b>{spinsLeft}</b>
            </p>

            <button
                onClick={spin}
                disabled={spinsLeft === 0 || isSpinning}
                className="
          w-full py-2 rounded-md
          bg-white/10 hover:bg-white/20
          disabled:opacity-40
          transition
        "
            >
                {isSpinning ? "Spinning..." : "Spin 🎡"}
            </button>

            {/* {result && (
                <p className="text-sm font-medium">
                    You got: {result}
                </p>
            )} */}
            {showResult && result && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowResult(false)}
                    />

                    {/* MODAL */}
                    <div
                        className="
                relative z-10
                w-64 p-5 rounded-xl
                bg-zinc-900/90 border border-white/20
                shadow-xl
                text-center space-y-3
                animate-in fade-in zoom-in
            "
                    >
                        <div className="text-5xl">{result.icon}</div>

                        <h2 className="text-lg font-semibold">
                            Congratulations!
                        </h2>

                        <p className="text-sm opacity-80">
                            You got <b>{result.label}</b>
                        </p>

                        <button
                            onClick={() => setShowResult(false)}
                            className="
                    mt-3 w-full py-2 rounded-md
                    bg-white/10 hover:bg-white/20
                    transition
                "
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
