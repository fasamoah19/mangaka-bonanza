export type Manga = {
  id: number;
  attributes?: {
    name: string;
    price: number;
    rating: number | null;
    in_print: boolean;
    release_date: string;
    slug: string;
    summary: string;
    createdAt: string;
    updatedAt: string;
    genres: string[];
    series_name: string;
    image: {
      data: Image
    };
    mangaka: {
      data: Mangaka;
    }
  };
}

type Image = {
  id: number;
  attributes?: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    ext: string;
    url: string;
  }
}

export type Mangaka = {
  id: number;
  attributes?: {
    name: string;
    birth_place: string;
    date_of_birth: string;
    bio: string;
    firstMangaTitle: string;
    mostRecentMangaTitle: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    image: {
      data: Image
    };
    manga: {
      data: Manga[]
    },
    manga_series: {
      data: MangaSeries[]
    }
  }
}

export type Review = {

}

export type MangaSeries = {
  id: number;
  attributes?: {
    name: string;
    mangaka: {
      data: Mangaka;
    };
    summary: string;
    genres: string[];
    firstCover: {
      data: Image
    };
    mangas: {
      data: Manga[]
    },
    slug: string,
  }
}

// Cart Type (an array of numbers)
export type Cart = number[]