"use client";

import { SocialSharing } from "@/components/custom/social-sharing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerTest() {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center">
      <SocialSharing title="Sonner test" url="https://meowani.site/sonner" />
      <div className="flex flex-row gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.success("Success", { closeButton: true })}
        >
          Success
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.info("Info", { closeButton: true })}
        >
          Info
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.warning("Warning", { closeButton: true })}
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.error("Error", { closeButton: true })}
        >
          Error
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.loading("Loading", { closeButton: true })}
        >
          Loading
        </Button>
      </div>
    </div>
  );
}
