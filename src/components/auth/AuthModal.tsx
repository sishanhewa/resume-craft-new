"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, X, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function AuthModal({
    isOpen,
    onClose,
    defaultTab = "login",
}: {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: "login" | "register";
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const supabase = createClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLogin = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setAuthError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                setAuthError(error.message);
                return;
            }

            toast.success("Welcome back!");
            onClose();
            router.refresh();
        } catch (error) {
            setAuthError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const onRegister = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setAuthError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setAuthError(error.message);
                return;
            }

            toast.success("Account created! Checks your email or login now.");
            // Optionally auto-login or switch to login tab
        } catch (error) {
            setAuthError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=${window.location.pathname}${window.location.search}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            if (error) {
                console.error("Google Sign-In Error:", error);
                throw error;
            }

            // Explicitly redirect if the SDK doesn't do it automatically or if we want to be sure
            if (data.url) {
                console.log("Redirecting to:", data.url);
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Sign-In Catch Error:", error);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast.error((error as any)?.message || "Error signing in with Google");
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                            ResumeCraft
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                        Sign in to save your resume and access it from anywhere.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-100/50 dark:bg-zinc-800/50 p-1">
                        <TabsTrigger
                            value="login"
                            className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all"
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger
                            value="register"
                            className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all"
                        >
                            Register
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-6 space-y-4">
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full flex items-center gap-2 h-11 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all"
                            onClick={signInWithGoogle}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            )}
                            Continue with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-2 text-zinc-500">Or continue with email</span>
                            </div>
                        </div>
                    </div>

                    <TabsContent value="login">
                        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="h-11 rounded-xl bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                                    {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="h-11 rounded-xl bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                                    {...form.register("password")}
                                />
                                {form.formState.errors.password && (
                                    <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                                )}
                            </div>

                            {authError && (
                                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/30">
                                    {authError}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={form.handleSubmit(onRegister)} className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="register-email">Email</Label>
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="h-11 rounded-xl bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                                    {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-password">Password</Label>
                                <Input
                                    id="register-password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="h-11 rounded-xl bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                                    {...form.register("password")}
                                />
                                {form.formState.errors.password && (
                                    <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                                )}
                            </div>

                            {authError && (
                                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/30">
                                    {authError}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
