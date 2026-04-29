export const SOURCE_API = new (class {
  BASE = "https://source.meowani.site";
  HIANIME = {
    PATH: `${this.BASE}/anime/hianime`,
    get INFO() {
      return `${this.PATH}/info?`;
    },
    get SPOTLIGHT() {
      return `${this.PATH}/spotlight`;
    },
    RECENTLY_ADDED: `${this.BASE}/anime/hianime/recently-added`,
  };
  ANIMEPAHE = {
    PATH: `${this.BASE}/anime/animepahe`,
    get RECENT_EPISODES() {
      return `${this.PATH}/recent-episodes`;
    },
  };
})();
