import { apps, AppKey } from "@/lib/apps";

export default function Dock({
    onSelect,
    onRestore,
}: {
    onSelect: (app: AppKey) => void;
    onRestore: () => void;
}) {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex gap-4 px-5 py-3 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30">
                {Object.entries(apps).map(([key, app]) => (
                    <button
                        key={key}
                        onClick={() => {
                            onSelect(key as AppKey);
                            onRestore();
                        }}
                    >
                        {app.icon}
                    </button>

                ))}
            </div>
        </div>
    );
}
