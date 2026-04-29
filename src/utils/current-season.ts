export type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";

/**
 * Determine the current anime season and its year from the system date.
 *
 * @returns An object with `season` set to one of `"WINTER"`, `"SPRING"`, `"SUMMER"`, or `"FALL"` and `year` set to the corresponding year for that season.
 */
export function getCurrentAnimeSeason(): { season: Season; year: number } {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let season: Season;
  let seasonYear = year;

  if (month >= 0 && month <= 2) {
    season = "WINTER";
  } else if (month >= 3 && month <= 5) {
    season = "SPRING";
  } else if (month >= 6 && month <= 8) {
    season = "SUMMER";
  } else {
    season = "FALL";
  }

  return { season, year: seasonYear };
}

export class AnimeSeason {
  private static readonly SEASONS: Season[] = [
    "WINTER",
    "SPRING",
    "SUMMER",
    "FALL",
  ];

  private constructor(
    public readonly season: Season,
    public readonly year: number,
  ) {}

  static now(): AnimeSeason {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    let season: Season;

    if (month >= 0 && month <= 2) season = "WINTER";
    else if (month >= 3 && month <= 5) season = "SPRING";
    else if (month >= 6 && month <= 8) season = "SUMMER";
    else season = "FALL";

    return new AnimeSeason(season, year);
  }

  next(): AnimeSeason {
    const currentIndex = AnimeSeason.SEASONS.indexOf(this.season);
    const nextIndex = (currentIndex + 1) % AnimeSeason.SEASONS.length;
    const nextSeason = AnimeSeason.SEASONS[nextIndex];
    const year = nextSeason === "WINTER" ? this.year + 1 : this.year;
    return new AnimeSeason(nextSeason, year);
  }

  previous(): AnimeSeason {
    const currentIndex = AnimeSeason.SEASONS.indexOf(this.season);
    const prevIndex =
      (currentIndex - 1 + AnimeSeason.SEASONS.length) %
      AnimeSeason.SEASONS.length;
    const prevSeason = AnimeSeason.SEASONS[prevIndex];
    const year = prevSeason === "FALL" ? this.year - 1 : this.year;
    return new AnimeSeason(prevSeason, year);
  }

  toString(): string {
    return `${this.season} ${this.year}`;
  }
}
