type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";

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
