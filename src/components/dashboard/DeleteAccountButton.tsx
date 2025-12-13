"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteUserAccount } from "@/actions/account";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeleteAccountButtonProps {
    userEmail: string;
}

export function DeleteAccountButton({ userEmail }: DeleteAccountButtonProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isPending, startTransition] = useTransition();

    const isConfirmed = confirmText === "DELETE";

    const handleDelete = () => {
        if (!isConfirmed) return;

        startTransition(async () => {
            const result = await deleteUserAccount();

            if (result.success) {
                toast.success("Account deleted successfully");
                setIsOpen(false);
                router.push("/");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to delete account");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-950/30"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Delete Your Account
                    </DialogTitle>
                    <DialogDescription className="text-left pt-2">
                        This action is <strong className="text-red-600">permanent and irreversible</strong>.
                        All your data will be deleted:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Immediate deletion notice */}
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                            Deleted immediately:
                        </p>
                        <ul className="text-sm text-red-700 dark:text-red-400 space-y-1 ml-1">
                            <li>• All your saved resumes</li>
                            <li>• Your import history</li>
                            <li>• Your profile data</li>
                        </ul>
                    </div>

                    {/* Account deletion timeline */}
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                            <strong>Account deletion:</strong> Your account will be permanently removed within
                            <strong> 3-5 working days</strong> upon manual review.
                        </p>
                    </div>

                    {/* Email confirmation */}
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Account: <strong>{userEmail}</strong>
                    </div>

                    {/* Type DELETE to confirm */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Type <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">DELETE</span> to confirm:
                        </label>
                        <Input
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="Type DELETE here"
                            className="font-mono"
                            disabled={isPending}
                        />
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={!isConfirmed || isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete My Account
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
