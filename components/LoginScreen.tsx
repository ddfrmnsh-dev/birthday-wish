"use client";
import { useState } from "react";
import { getTodayPassword, isToday21012026 } from "@/lib/datePassword";

// const VALID_PASSWORD = "21012026";
const VALID_PASSWORD = "22122025";
export default function LoginScreen({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async () => {

        const passwordValid = password === VALID_PASSWORD;
        const dateValid = getTodayPassword();
        // const dateValid = isToday21012026();

        if (password !== "22122025") {
            setMsg("Wrong password");
            return;
        }
        // if (password !== "21012026") {
        //     setMsg("Wrong password");
        //     return;
        // }

        // if (!isToday21012026()) {
        //     setMsg("This password is not valid today");
        //     return;
        // }
        if (!getTodayPassword()) {
            setMsg("This password is not valid today");
            return;
        }

        if (passwordValid && dateValid) {
            await fetch("https://api.jsonbin.io/v3/b", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Access-Key": "$2a$10$FTU4uBJ1UE3T9tOlbqAyeO5bxLzY.s9t6saHjR5gls3XqjXhQXihW",
                    "X-Collection-Id": "6967a144d0ea881f406b8b19",
                    "X-Bin-Name": "login-logs",
                },
                body: JSON.stringify({
                    name: "ayuuunnss",
                    status: "sudah login",
                    time: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
                }),
            });

            onSuccess();
        } else {
            setError(true);
            setPassword("");
        }
    };

    return (
        // <div className="h-screen w-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 to-black text-white"
        //     style={{ backgroundImage: "url('/background.jpeg')" }}>
        //     {/* Avatar */}
        //     <img
        //         src="/profile.jpeg"
        //         alt="User Avatar"
        //         className="w-24 h-24 mb-4 rounded-full object-cover
        //      border border-white/20 shadow-lg"
        //     />
        //     <h1 className="text-lg mb-6 opacity-80">ayuuunnss</h1>

        //     {/* Password Input */}
        //     <input
        //         type="password"
        //         value={password}
        //         onChange={(e) => {
        //             setPassword(e.target.value);
        //             setError(false);
        //             setMsg("");
        //         }}
        //         placeholder="DDMMYYYY"
        //         className={`
        //   bg-white/10 backdrop-blur-md
        //   border rounded-lg px-4 py-2
        //   text-center outline-none
        //   transition
        //   ${error
        //                 ? "border-red-500 animate-shake"
        //                 : "border-white/20"}
        // `}
        //         onKeyDown={(e) => {
        //             if (e.key === "Enter") handleSubmit();
        //         }}
        //     />

        //     {/* Hint / Error */}
        //     {/* <p className="mt-4 text-xs opacity-50">
        //         {error
        //             ? "❌ Wrong date"
        //             : "Password is today’s date"}
        //     </p> */}
        //     {msg && (
        //         <p className="mt-3 text-sm text-red-400 animate-shake">
        //             {msg}
        //         </p>
        //     )}

        //     <p className="mt-4 text-xs opacity-50">
        //         Hint: Password is 8 digits of your birthdate, e.g: 01012026
        //     </p>

        //     {/* Submit */}
        //     <button
        //         onClick={handleSubmit}
        //         className="mt-4 text-xs opacity-70 hover:opacity-100"
        //     >
        //         Unlock →
        //     </button>
        // </div>
        <div
            className="relative h-screen w-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/background.jpeg')" }}
        >
            {/* Blur + dark overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                {/* Avatar */}
                <img
                    src="/profile.jpeg"
                    alt="User Avatar"
                    className="w-24 h-24 mb-4 rounded-full object-cover
                 border border-white/20 shadow-lg"
                />

                <h1 className="text-lg mb-6 opacity-80">
                    ayuuunnss
                </h1>

                {/* Password Input */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                        setMsg("");
                    }}
                    placeholder="DDMMYYYY"
                    className={`
        bg-white/10 backdrop-blur-md
        border rounded-lg px-4 py-2
        text-center outline-none
        transition
        ${error
                            ? "border-red-500 animate-shake"
                            : "border-white/20"
                        }
      `}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                />

                {msg && (
                    <p className="mt-3 text-sm text-red-400 animate-shake">
                        {msg}
                    </p>
                )}

                <p className="mt-4 text-xs opacity-50">
                    Hint: Password is 8 digits of your birthdate, e.g: 01012026
                </p>

                <button
                    onClick={handleSubmit}
                    className="mt-4 text-xs opacity-70 hover:opacity-100"
                >
                    Unlock →
                </button>
            </div>
        </div>
    );
}
