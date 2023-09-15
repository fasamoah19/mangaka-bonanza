import HeadComponent from "@/components/HeadComponent";
import SeriesGrid from "@/components/SeriesGrid";
import { supabase } from "@/lib/api";
import { MangaSeries } from "@/lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

/**
 * Retrieves all the manga by a selected genre
 *
 * @param context GetServerSidePropsContext (used to retrieve the selected genre)
 * @returns Selected genre and the manga within that genre
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const genre = context.params?.genre;

  const { data: seriesList, error } = await supabase.from('MangaSeries')
    .select(`
    *,
    mangaka (
      name,
      slug
    )
    `)
    .contains('genres', [genre])

  if (error) {
    return {
      redirect: {
        destination: '/500'
      }
    }
  }

  return {
    props: {
      genre: genre,
      seriesList: seriesList as MangaSeries[],
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
    <>
      <HeadComponent
        title={`Genre | Mangaka Bonanza`}
        description={`All the manga within the ${genre} genre`}
      />
      <div className="flex flex-col pb-8">
        <div className="mt-16">
          <SeriesGrid seriesList={seriesList} gridTitle={`${genre}`} />
        </div>
      </div>
    </>
  );
}
