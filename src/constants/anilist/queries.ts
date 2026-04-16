import gpl from "graphql-tag";

export const trending = gpl`
  query Trending($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: TRENDING_DESC, type: ANIME, genre_not_in: ["Hentai"]) {
        id
        idMal
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
          extraLarge
          color
        }
        description
        bannerImage
        episodes
        status
        duration
        genres
        season
        format
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          episode
        }
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        trailer {
          id
          site
          thumbnail
        }
      }
    }
  }
`;

export const top100anime = gpl`
  query Top100Anime($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: SCORE_DESC, type: ANIME, genre_not_in: ["Hentai"]) {
        id
        idMal
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
          extraLarge
          color
        }
        episodes
        status
        duration
        genres
        season
        format
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          episode
        }
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const popular = gpl`
  query Popular($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: POPULARITY_DESC, type: ANIME, genre_not_in: ["Hentai"]) {
        id
        idMal
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
          extraLarge
          color
        }
        episodes
        status
        duration
        genres
        season
        format
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          episode
        }
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const seasonal = gpl`
  query Seasonal($perPage: Int, $page: Int, $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, genre_not_in: ["Hentai"]) {
        id
        idMal
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
          extraLarge
          color
        }
        episodes
        status
        duration
        genres
        season
        format
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          episode
        }
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const animeInfo = gpl`
  query AnimeInfo($id: Int) {
    Media(id: $id) {
      id
      idMal
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage {
        large
        extraLarge
        color
      }
      description
      bannerImage
      episodes
      status
      duration
      genres
      source
      type
      format
      averageScore
      popularity
      countryOfOrigin
      nextAiringEpisode {
        airingAt
        episode
      }
      season
      seasonYear
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      trailer {
        id
        site
        thumbnail
      }
      studios(isMain: true) {
        nodes {
          id
          name
          siteUrl
        }
      }
      relations {
        edges {
          relationType(version: 2)
          node {
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            format
            coverImage {
              large
              extraLarge
              color
            }
            episodes
            chapters
            status
          }
        }
      }
      recommendations {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            coverImage {
              large
              extraLarge
              color
            }
            episodes
            status
            format
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
          }
        }
      }
      characters {
        edges {
          id
          role
          node {
            name {
              first
              last
              full
              native
              userPreferred
            }
            image {
              large
            }
          }
          voiceActorRoles {
            voiceActor {
              id
              name {
                first
                middle
                last
                full
                native
                userPreferred
              }
              image {
                large
              }
            }
          }
        }
      }
    }
  }
`;

export const advancedsearch = gpl`
  query AdvancedSearch(
    $page: Int = 1,
    $id: Int,
    $type: MediaType,
    $search: String,
    $format: [MediaFormat],
    $status: MediaStatus,
    $countryOfOrigin: CountryCode,
    $source: MediaSource,
    $season: MediaSeason,
    $seasonYear: Int,
    $year: String,
    $onList: Boolean,
    $episodesLesser: Int,
    $episodesGreater: Int,
    $durationLesser: Int,
    $durationGreater: Int,
    $genres: [String],
    $tags: [String],
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC],
  ) {
    Page(page: $page, perPage: 24) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        id: $id,
        type: $type,
        season: $season,
        format_in: $format,
        status: $status,
        countryOfOrigin: $countryOfOrigin,
        source: $source,
        search: $search,
        onList: $onList,
        seasonYear: $seasonYear,
        startDate_like: $year,
        episodes_lesser: $episodesLesser,
        episodes_greater: $episodesGreater,
        duration_lesser: $durationLesser,
        duration_greater: $durationGreater,
        genre_in: $genres,
        genre_not_in: ["Hentai"],
        tag_in: $tags,
        sort: $sort,
      ) {
        id
        idMal
        title {
          english
          romaji
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        bannerImage
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        studios {
          nodes {
            id
            name
          }
        }
        season
        seasonYear
        description
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        mediaListEntry {
          id
          status
        }
      }
    }
  }
`;

export const advancedstudio = gpl`
  query AdvancedStudioSearch(
    $page: Int = 1,
    $onList: Boolean,
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC],
    $studioId: Int,
  ) {
    Studio(id: $studioId) {
      name
      media(
        onList: $onList,
        sort: $sort, 
        page: $page, 
        perPage: 24
      ) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        nodes {
          id
          idMal
          title {
            english
            romaji
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            color
          }
          bannerImage
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          studios {
            nodes {
              id
              name
            }
          }
          season
          seasonYear
          description
          type
          format
          status(version: 2)
          episodes
          duration
          chapters
          volumes
          genres
          isAdult
          averageScore
          popularity
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
          mediaListEntry {
            id
            status
          }
        }
      }
    }
  }
`;

export const schedule = gpl`
  query AiringSchedule($page: Int, $perPage: Int, $from: Int, $to: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      airingSchedules(airingAt_greater: $from, airingAt_lesser: $to, media_genre_not_in: ["Hentai"]) {
        episode
        timeUntilAiring
        airingAt
        media {
          id
          title {
            english
            romaji
            native
            userPreferred
          }
          description
          coverImage {
            extraLarge
            large
            color
          }
          bannerImage
          format
          status(version: 2)
          episodes
          type
          genres
        }
      }
    }
  }
`;
