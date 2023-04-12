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
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
}

export type Review = {

}