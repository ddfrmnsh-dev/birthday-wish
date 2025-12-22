import { apps, AppKey } from "@/lib/apps";

export default function MobileNav({
    onSelect,
}: {
    onSelect: (app: AppKey) => void;
}) {
    return (
        <div className="md:hidden fixed bottom-0 w-full bg-black/40 backdrop-blur-lg border-t border-white/20">
            <div className="flex justify-around py-3 text-xl">
                {Object.entries(apps).map(([key, app]) => (
                    <button
                        key={key}
                        onClick={() => onSelect(key as AppKey)}
                    >
                        {app.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}
