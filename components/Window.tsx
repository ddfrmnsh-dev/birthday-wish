interface Props {
    title: string;
    state: "open" | "closing" | "minimized" | "maximized";
    onClose: () => void;
    onMinimize: () => void;
    onToggleMaximize: () => void;
    children: React.ReactNode;
}

export default function Window({
    title,
    state,
    onClose,
    onMinimize,
    onToggleMaximize,
    children,
}: Props) {
    if (state === "minimized") return null;

    return (
        <div
            className={`
        transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]
        bg-white/15 backdrop-blur-xl
        border border-white/20 shadow-2xl
        origin-center

        ${state === "closing" &&
                "scale-95 opacity-0"
                }

        ${state === "maximized"
                    ? "fixed inset-4 rounded-xl"
                    : "w-full h-full md:w-[520px] md:min-h-[420px] md:rounded-xl"
                }
      `}
        >
            {/* Title Bar */}
            <div className="flex items-center px-3 py-2 border-b border-white/20 group">
                <div className="hidden md:flex gap-1.5">
                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="relative w-3 h-3 rounded-full bg-red-500"
                    >
                        <span className="mac-icon">×</span>
                    </button>

                    {/* MINIMIZE */}
                    <button
                        onClick={onMinimize}
                        className="relative w-3 h-3 rounded-full bg-yellow-400"
                    >
                        <span className="mac-icon">−</span>
                    </button>

                    {/* MAXIMIZE */}
                    <button
                        onClick={onToggleMaximize}
                        className="relative w-3 h-3 rounded-full bg-green-500"
                    >
                        <span className="mac-icon">+</span>
                    </button>
                </div>

                <span className="mx-auto text-xs opacity-70">
                    {title}
                </span>
            </div>

            <div className="p-5">
                {children}
            </div>
        </div>
    );
}

