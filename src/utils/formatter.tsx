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
