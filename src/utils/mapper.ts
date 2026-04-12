import type { MediaStatus } from "@/types/anilist-types";

export type IStatus =
  | "CANCELLED"
  | "FINISHED"
  | "HIATUS"
  | "UPCOMING"
  | "ONGOING"
  | "OTHER";

export const mapStatus = (status: MediaStatus): IStatus => {
  switch (status) {
    case "NOT_YET_RELEASED":
      return "UPCOMING";
    case "RELEASING":
      return "ONGOING";
    default:
      return status;
  }
};
