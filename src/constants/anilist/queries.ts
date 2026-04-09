export const trending = `
  query($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: TRENDING_DESC, type: ANIME) {
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

export const top100anime = `
  query($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: SCORE_DESC, type: ANIME) {
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

export const popular = `
  query($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(sort: POPULARITY_DESC, type: ANIME) {
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

export const seasonal = `
  query($perPage: Int, $page: Int, $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME) {
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

export const animeInfo = `
  query($id: Int) {
    Media(id: $id) {
      id
      idMal
      title {
        romaji
        english
        native
        userPreferred
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
