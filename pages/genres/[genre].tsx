import SeriesGrid from "@/components/SeriesGrid";
import { strapiFetch } from "@/lib/custom-functions";
import { MangaSeries } from "@/lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import qs from "qs";

/**
 * Retrieves all the manga by a selected genre
 * 
 * @param context GetServerSidePropsContext (used to retrieve the selected genre)
 * @returns Selected genre and the manga within that genre
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const genre = context.params?.genre;
  const query = qs.stringify(
    {
      filters: {
        genres: {
          $containsi: genre,
        },
      },
      sort: ["name"],
      populate: {
        firstCover: true,
        mangaka: true,
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await strapiFetch(
    process.env.NEXT_PUBLIC_STRAPI_API_MANGA_SERIES_PATH!,
    query
  );

  const mangaObjects = await response.json();
  const data = mangaObjects.data as MangaSeries[];

  return {
    props: {
      genre: genre,
      seriesList: data,
    },
  };
}

/**
 * This page displays a grid of mangas by a selected genre
 * 
 * @param param0 ServerSideProps data
 * @returns SelectedGenre component
 */
export default function SelectedGenre({
  genre,
  seriesList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col pb-8">
      <div className="mt-16">
        <SeriesGrid seriesList={seriesList} gridTitle={`${genre}`} />
      </div>
    </div>
  );
}
