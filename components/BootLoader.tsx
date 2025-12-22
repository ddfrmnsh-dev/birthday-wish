export default function BootLoader() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
            {/* Apple Logo */}
            <div className="text-5xl mb-10 animate-pulse">🍎</div>

            {/* App Icons Animation */}
            <div className="flex gap-4">
                {["🎁", "📷", "⏯️", "🎂", "📣"].map((icon, i) => (
                    <span
                        key={i}
                        className="text-2xl animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        {icon}
                    </span>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 w-48 h-1 bg-white/20 rounded overflow-hidden">
                <div className="h-full w-full bg-white animate-[loading_2s_ease-in-out_infinite]" />
            </div>

            <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
