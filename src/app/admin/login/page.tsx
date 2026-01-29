"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError("Incorrect Password");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-obsidian/10 space-y-8">
                <div className="text-center space-y-4">
                    <div className="relative h-16 w-16 mx-auto">
                        <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                    </div>
                    <h1 className="font-serif text-2xl text-obsidian uppercase tracking-widest">Admin Access</h1>
                    <p className="text-obsidian/50 text-sm font-light">Enter your master password to continue.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/30" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Master Password"
                                className="w-full pl-10 pr-4 py-3 bg-sand/20 border border-obsidian/10 rounded focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper/20 transition-all font-serif"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full h-12 uppercase tracking-widest"
                        isLoading={loading}
                    >
                        Unlock
                    </Button>
                </form>
            </div>
        </div>
    );
}
