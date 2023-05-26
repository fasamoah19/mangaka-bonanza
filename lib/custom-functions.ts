import qs from "qs";
import { Manga } from "./types";

export const strapiFetch = async (path: string, query: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${path}?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_PROD_KEY!}`,
      },
    }
  );

}

/**
 * Helper function that retrieves the mangas within the cart
 * by their ID
 *
 * @param cart IDs of the manga in the cart
 * @returns list of mangas
 */
export async function getMangas(cart: number[]) {
  const query = qs.stringify(
    {
      filters: {
        id: {
          $eq: cart,
        },
      },
      populate: {
        image: true,
        mangaka: {
          populate: ["name"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await strapiFetch(process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!, query)
  const mangaObjects = await response.json();
  const data = mangaObjects.data as Manga[];

  return data;
}

/**
 * Gets a list of manga to display in the recommended section. This function
 * retrieves the list of manga in the users cart and gathers the genres. From those genres,
 * it will pull a list of manga within that genre that are NOT the manga within the users cart
 * 
 * @returns list of Manga objects
 */
export async function getRecommended(mangas: Manga[]) {
  const genres = new Set(mangas.map((manga) => manga.attributes?.genres).flat())
  const query = qs.stringify({
    pagination: {
      page: 1,
      pageSize: 12
    },
    filters: {
      id: {
        $ne: mangas.length > 0 ? mangas.map((manga) => manga.id) : [0]
      },
      genres: {
        $in: mangas.length > 0 ? genres : "Comedy"
      },
      series_name: {
        $notIn: mangas.map((manga) => manga.attributes?.series_name)
      },
      in_print: true
    },
    populate: {
      image: true,
      mangaka: true
    }
  }, { encodeValuesOnly: true })

  const response = await strapiFetch(process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!, query)

  const mangaObjects = await response.json();
  const data = mangaObjects.data as Manga[]
  // Filters to show only one volume from a manga series
  const filteredMangas = data.filter((manga, index, self) => {
    return (
      self.findIndex(
        (v) => v.attributes?.series_name === manga.attributes?.series_name
      ) === index
    );
  }).splice(0, 4)

  return filteredMangas;
}