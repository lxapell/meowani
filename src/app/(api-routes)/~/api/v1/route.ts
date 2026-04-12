/*
 * This is only for testing and will be omitted on production,
 * all API request are SSR fetched
 */

import { NextRequest, NextResponse } from "next/server";
import gpl from "graphql-tag";

import { anilistRequest } from "@/lib/anilist/client";
import {
  animeInfo,
  top100anime,
  seasonal,
  popular,
  trending,
} from "@/constants/anilist/queries";

const Tag = gpl`
  query MediaTagCollection {
    MediaTagCollection {
      name
      isAdult
    }
  }
`;

const Studio = gpl`
   query($page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo { hasNextPage }
      studios {
        id
        name
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const method = searchParams.get("method");
  const animeSeason = searchParams.get("season");
  const seasonYear = searchParams.get("year");

  try {
    let query;
    let variables = {
      perPage: 10,
      page: 1,
      id: id,
      season: animeSeason,
      seasonYear,
    };
    switch (method) {
      case "animeInfo":
        query = animeInfo;
        break;
      case "seasonal":
        query = seasonal;
        break;
      case "popular":
        query = popular;
        break;
      case "trending":
        query = trending;
        break;
      case "genres":
        query = "{ GenreCollection }";
        break;
      case "tags":
        query = Tag;
        break;
      case "studios":
        query = Studio;
        break;
      default:
        query = top100anime;
        break;
    }

    const data = await anilistRequest(query, variables);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
