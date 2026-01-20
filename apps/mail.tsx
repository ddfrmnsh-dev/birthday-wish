"use client";

import { useMemo, useState } from "react";

type FormState = {
    title: string;
    datetimeLocal: string; // yyyy-mm-ddThh:mm
    location: string;
    dresscode: string;
    meetPoint: string;
    note: string;
};

export default function MailApp() {
    const locations = useMemo(
        () => [
            "Cafe / Coffee Shop",
            "Mall",
            "Beach",
            "Restaurant",
            "Park",
            "Home",
            "Other",
        ],
        []
    );

    const [form, setForm] = useState<FormState>({
        title: "One day with Ayunss Goes to Aquarium date",
        datetimeLocal: "",
        location: "",
        dresscode: "",
        meetPoint: "",
        note: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const update = <K extends keyof FormState>(key: K, val: FormState[K]) => {
        setSubmitted(false);
        setForm((p) => ({ ...p, [key]: val }));
    };

    const canSubmit =
        form.datetimeLocal.trim() &&
        form.location.trim() &&
        form.dresscode.trim() &&
        form.meetPoint.trim();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        // TODO: nanti bisa kirim ke endpoint / api / jsonbin
        console.log("[Event Submit]", form);
        setSubmitted(true);

        await fetch("https://api.jsonbin.io/v3/b", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Access-Key": "$2a$10$FTU4uBJ1UE3T9tOlbqAyeO5bxLzY.s9t6saHjR5gls3XqjXhQXihW",
                "X-Collection-Id": "6967a144d0ea881f406b8b19",
                "X-Bin-Name": "mail-logs",
            },
            body: JSON.stringify({
                name: "ayuuunnss",
                data: form,
                time: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
            }),
        });
    };

    const reset = () => {
        setSubmitted(false);
        setForm({
            title: "One day with Ayunss Goes to Aquarium date",
            datetimeLocal: "",
            location: "",
            dresscode: "",
            meetPoint: "",
            note: "",
        });
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h1 className="text-lg font-semibold">✉️ Maybe this last meet huehue</h1>
                    <p className="text-xs opacity-70">
                        Iziinnnn, isi selengkap mungkin yaaaw.
                    </p>
                </div>

                {submitted && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-green-500/15 border border-green-400/20 text-green-200">
                        Sent ✓
                    </span>
                )}
            </div>

            {/* Card */}
            <form
                onSubmit={handleSubmit}
                className="
          rounded-xl
          border border-white/10
          bg-white/5
          backdrop-blur-md
          p-4
          space-y-4
        "
            >
                {/* Title */}
                <div className="space-y-1">
                    <label className="text-[11px] opacity-70">Title</label>

                    <div
                        className="
      w-full rounded-lg
      bg-white/10 border border-white/10
      px-3 py-2 text-sm
      opacity-90
      select-text
    "
                    >
                        One day with Ayunss Goes to Aquarium{" "}
                        <span className="line-through">date</span>
                    </div>
                </div>


                {/* Date & Time */}
                <div className="space-y-1">
                    <label className="text-[11px] opacity-70">
                        Date & Time <span className="opacity-50">(required)</span> *pilih di bulan februari yaa
                    </label>
                    <input
                        type="datetime-local"
                        value={form.datetimeLocal}
                        onChange={(e) => update("datetimeLocal", e.target.value)}
                        className="
              w-full rounded-lg
              bg-white/10 border border-white/10
              px-3 py-2 text-sm outline-none
              focus:border-white/30
              transition
            "
                    />
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="text-[11px] opacity-70">
                        Location <span className="opacity-50">(required)</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        {["BXSea", "Jakarta Aquarium"].map((opt) => (
                            <label
                                key={opt}
                                className={`
          flex items-center gap-2
          px-3 py-2 rounded-lg
          border transition cursor-pointer
          ${form.location === opt
                                        ? "bg-white/15 border-white/25"
                                        : "bg-white/5 border-white/10 hover:bg-white/10"}
        `}
                            >
                                <input
                                    type="radio"
                                    name="location"
                                    value={opt}
                                    checked={form.location === opt}
                                    onChange={(e) => update("location", e.target.value)}
                                    className="accent-white"
                                />
                                <span className="text-sm">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>


                {/* Dresscode */}
                <div className="space-y-1">
                    <label className="text-[11px] opacity-70">
                        Dresscode <span className="opacity-50">(required)</span>
                    </label>
                    <input
                        value={form.dresscode}
                        onChange={(e) => update("dresscode", e.target.value)}
                        placeholder="e.g. Casual / Black / White"
                        className="
              w-full rounded-lg
              bg-white/10 border border-white/10
              px-3 py-2 text-sm outline-none
              focus:border-white/30
              transition
            "
                    />
                </div>

                {/* Meet Point */}
                <div className="space-y-1">
                    <label className="text-[11px] opacity-70">
                        Pick Up <span className="opacity-50">(required)</span>
                    </label>
                    <input
                        value={form.meetPoint}
                        onChange={(e) => update("meetPoint", e.target.value)}
                        placeholder="e.g. St. Sudirman / MRT / LRT"
                        className="
              w-full rounded-lg
              bg-white/10 border border-white/10
              px-3 py-2 text-sm outline-none
              focus:border-white/30
              transition
            "
                    />
                </div>

                {/* Optional note */}
                <div className="space-y-1">
                    <label className="text-[11px] opacity-70">Note (optional)</label>
                    <textarea
                        value={form.note}
                        onChange={(e) => update("note", e.target.value)}
                        placeholder="Any extra info.."
                        rows={3}
                        className="
              w-full rounded-lg
              bg-white/10 border border-white/10
              px-3 py-2 text-sm outline-none
              focus:border-white/30
              transition
              resize-none
            "
                    />
                </div>

                {/* Footer actions */}
                <div className="flex items-center gap-2 pt-1">
                    <button
                        type="button"
                        onClick={reset}
                        className="
              px-3 py-2 rounded-md
              bg-white/5 hover:bg-white/10
              border border-white/10
              text-xs transition
            "
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="
              ml-auto px-4 py-2 rounded-md
              bg-white/15 hover:bg-white/25
              border border-white/10
              text-xs font-medium transition
              disabled:opacity-40 disabled:hover:bg-white/15
            "
                    >
                        Send ✉️
                    </button>
                </div>

                {/* Inline validation hint */}
                {!canSubmit && (
                    <>
                        <p className="text-[11px] opacity-60">
                            Required: Date & Time, Location, Dresscode, Meet Point.
                        </p>
                        <p className="text-[11px] opacity-60">
                            *Boleh diinfo yaa kalo gabisa, japri ajaa hehe.
                        </p>
                    </>
                )}
            </form>
        </div>
    );
}
