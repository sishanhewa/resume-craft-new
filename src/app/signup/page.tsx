"use client";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
// NOTE: Assume you have a component for the logo/branding
// import Logo from "@/components/logo";

export default function SignUpPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Implement Supabase signUp logic here (e.g., supabase.auth.signUp)
        console.log("Sign Up attempt...");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px] shadow-xl border-t-4 border-blue-500">
                <CardHeader className="space-y-1">
                    {/* <Logo className="mx-auto" /> */}
                    <CardTitle className="text-3xl font-bold text-center pt-2">Create Account</CardTitle>
                    <CardDescription className="text-center">
                        Start building your stunning resume today.
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
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                {/* Link to the Sign In page */}
                <div className="text-sm text-center pb-6">
                    Already have an account?{" "}
                    <Link href="/login" className="underline text-blue-600 hover:text-blue-700">
                        Sign In
                    </Link>
                </div>
            </Card>
        </div>
    );
}