import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Implement Supabase signInWithPassword logic here.
        // The redirect logic will happen in the subsequent middleware/auth handler.
        console.log("Sign In attempt...");
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
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                {/* Link back to the signup page */}
                <div className="text-sm text-center pb-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="underline text-blue-600 hover:text-blue-700">
                        Sign Up
                    </Link>
                </div>
            </Card>
        </div>
    );
}