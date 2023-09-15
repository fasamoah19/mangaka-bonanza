import { Manga, MangaSeries, Mangaka } from "./types";
import { supabase } from "./api";

/**
 * Helper function that retrieves the mangas within the cart
 * by their ID
 *
 * @param cart IDs of the manga in the cart
 * @returns list of mangas
 */
export async function getMangas(cart: number[]) {

  const { data, error } = await supabase
    .from('Manga')
    .select(`
      *,
      mangaka (
        name,
        slug
      )
    `)
    .in('id', cart)

  if (!error && data) return data as Manga[]
  else return []
}

/**
 * Gets a list of manga to display in the recommended section. This function
 * retrieves the list of manga in the users cart and gathers the genres. From those genres,
 * it will pull a list of manga within that genre that are NOT the manga within the users cart
 * 
 * @returns list of Manga objects
 */
export async function getRecommended(mangas: Manga[]) {
  const genres = new Set(mangas.map((manga) => manga?.genres).flat())

  const { data, error } = await supabase
    .from('Manga')
    .select(`
      *,
      mangaka (
        name,
        slug
      ),
      manga_series (
        name
      )
    `)
    .eq('in_print', true)
    .not('id', 'in', mangas.length > 0 ? `(${mangas.map((manga) => manga.id).toString()})` : '(0)')
    .contains('genres', mangas.length > 0 ? Array.from(genres) : [])
    .not('manga_series.name', 'in', mangas.length > 0 ? `(${mangas.map((manga) => (manga.manga_series as unknown as MangaSeries).name).toString()})` : '(0)')

  // Filters to show only one volume from a manga series
  const filteredMangas = data?.filter((manga, index, self) => {
    return (
      self.findIndex(
        (v) => (v?.manga_series as unknown as MangaSeries).name === (manga?.manga_series as unknown as MangaSeries).name
      ) === index
    );
  }).splice(0, 4)

  return filteredMangas;
}

export function transformImageLink(link: string, width: number, height: number) {
  const separated = link.split("upload/")
  const newLink = separated[0] + "upload/" + `c_scale,w_${width},h_${height}/` + separated[1]

  return newLink;
}

export function getImageAlt(item: Manga | MangaSeries | Mangaka) {
}