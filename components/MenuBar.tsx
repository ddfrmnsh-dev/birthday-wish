import { apps, AppKey } from "@/lib/apps";

export default function MenuBar({
    activeApp,
    onSelect,
}: {
    activeApp: AppKey;
    onSelect: (app: AppKey) => void;
}) {
    return (
        <div className="hidden md:flex fixed top-0 left-0 w-full h-8 backdrop-blur-md bg-white/10 border-b border-white/20 items-center px-4 text-xs">
            {/* Left */}
            <div className="flex items-center gap-4">
                <span className="font-semibold">🍎 Finder</span>

                {Object.entries(apps).map(([key, app]) => (
                    <button
                        key={key}
                        onClick={() => onSelect(key as AppKey)}
                        className={`
              px-2 py-0.5 rounded
              transition
              ${activeApp === key
                                ? "bg-white/20"
                                : "hover:bg-white/10"}
            `}
                    >
                        {app.title}
                    </button>
                ))}
            </div>

            {/* Right */}
            <div className="ml-auto opacity-80">
                {new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
        </div>
    );
}
