// src/app/login/page.tsx

"use client";

import { useState } from 'react'; // <-- FIX 1: Import useState
import { supabase } from '@/lib/supabase/client'; // <-- FIX 2: Assuming client file is created here
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

export default function LoginPage() {
    // --- FIX 3: Define State Variables ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // --- FIX 4: Declare handleSubmit as async ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
        }
        // If successful, the middleware will handle redirection

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px] shadow-xl border-t-4 border-blue-500">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center pt-2">Sign In</CardTitle>
                    <CardDescription className="text-center">
                        Access your resume builder and admin dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={email} // <-- FIX 5: Use state variable
                                onChange={(e) => setEmail(e.target.value)} // <-- Update state on change
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password} // <-- FIX 5: Use state variable
                                onChange={(e) => setPassword(e.target.value)} // <-- Update state on change
                            />
                        </div>
                        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>} {/* Display error */}
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                {/* ... Link back to signup page */}
            </Card>
        </div>
    );
}