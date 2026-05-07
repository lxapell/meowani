"use client";

import { socialSharing } from "@/constants/social";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Link from "next/link";

interface SocialSharingProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter",
    label: "X",
    generateUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (title, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (title, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    generateUrl: (title, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, url) =>
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: (title, url) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this anime: ${url}`)}`,
  },
};

export function SocialSharing({ title, url }: SocialSharingProps) {
  if (!socialSharing.display) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Shared successfully");
    } catch (error) {
      console.error("[SocialSharing] Failed to copy: ", error);
      toast.error("Failed to share");
    }
  };

  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([_, enabled]) => enabled && _ !== "copyLink")
    .map(([platformKey]) => ({
      key: platformKey,
      ...socialPlatforms[platformKey],
    }))
    .filter((platform) => platform.name);

  return (
    <div className="flex flex-row gap-4 mt-8 mb-4">
      <Label htmlFor="share">Share this anime:</Label>
      <div className="flex flex-row gap-4 items-center justify-center">
        {enabledPlatforms.map((platform, index) => (
          <Button key={index} variant="secondary" size="sm" asChild>
            <Link
              href={platform.generateUrl(title, url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform.label}
            </Link>
          </Button>
        ))}
        {socialSharing.platforms.copyLink && (
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            Copy
          </Button>
        )}
      </div>
    </div>
  );
}
