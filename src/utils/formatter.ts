interface TitleData {
  title: string;
  id: string;
}

export class TitleSlug {
  public readonly slug: string;

  constructor(slug: string) {
    this.validateSlug(slug);
    this.slug = slug;
  }

  /**
   * Validates if the slug contains at least one hyphen
   * and that the segment after the final hyphen is numeric.
   */
  private validateSlug(slug: string): void {
    const lastHyphenIndex = slug.lastIndexOf("-");
    if (lastHyphenIndex === -1) {
      throw new Error(
        `Invalid slug: "${slug}" must contain at least one hyphen.`,
      );
    }

    const idPart = slug.slice(lastHyphenIndex + 1);
    if (!/^\d+$/.test(idPart)) {
      throw new Error(
        `Invalid slug: final segment "${idPart}" must be numeric`,
      );
    }
  }

  /**
   * Extract the title (capitalized words > 2 letters) and ID
   * @returns {{ title: string, id: number }}
   */
  toTitle(): TitleData {
    const parts = this.slug.split("-");
    const id = parts.pop()!;
    const words = parts;

    const title = words
      .map((word: string): string => {
        if (word.length > 2) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase();
      })
      .join(" ");

    return { title, id };
  }

  /**
   * Get the numeric ID as a number.
   */
  getId(): number {
    const lastHyphenIndex = this.slug.lastIndexOf("-");
    return parseInt(this.slug.slice(lastHyphenIndex + 1), 10);
  }

  /**
   * Return the original slug string.
   */
  toString(): string {
    return this.slug;
  }

  /**
   * Create a TitleSlug instance from a title and numeric ID.
   */
  static fromTitle(title: string, id: string | number): TitleSlug {
    const slugTitle = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return new TitleSlug(`${slugTitle}-${id}`);
  }
}

export class DateFormatter {
  private date: Date;

  constructor(unixTimestamp: number) {
    this.date = new Date(unixTimestamp * 1000);
  }

  get formattted(): string {
    return Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(this.date);
  }

  get diff(): string {
    const now = new Date();

    const startOfTarget = new Date(this.date).setHours(0, 0, 0, 0);
    const startOfNow = new Date(now).setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const diffInDays = Math.round((startOfTarget - startOfNow) / msPerDay);

    const relativeFormatter = new Intl.RelativeTimeFormat("en-US", {
      numeric: "auto",
    });

    return relativeFormatter.format(diffInDays, "day");
  }
}

export const formatYearMonth = (year: number, month: number): string => {
  const date = new Date(year, month - 1);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
};

export const truncateHTML = (
  html: string,
  limit: number,
): { truncated: string | null; full: string } => {
  if (html.length <= limit) return { truncated: null, full: html };

  let truncated = html.slice(0, limit);

  const lastOpen = truncated.lastIndexOf("<");
  const lastClose = truncated.lastIndexOf(">");
  if (lastOpen > lastClose) {
    truncated = truncated.substring(0, lastOpen);
  }

  if (typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = truncated.trim() + "...";
    return { truncated: div.innerHTML, full: html };
  }

  return { truncated: truncated.trim() + "...", full: html };
};

export const capitalizeFirst = (text: string): string => {
  const result = text.toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};
