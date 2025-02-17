"use client";

import { Button } from "@/components/ui/button";

import { signIn } from "@/lib/auth-client";

import GoogleIcon from "../icons/google-icon";

interface SocialProps {
  isPending?: boolean;
}

export function Social({ isPending }: SocialProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => signIn.social({ provider: "google" })}
        disabled={isPending}
      >
        <GoogleIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
