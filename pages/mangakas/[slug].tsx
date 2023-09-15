import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import HeadComponent from "@/components/HeadComponent";
import SeriesGrid from "@/components/SeriesGrid";
import { supabase } from "@/lib/api";
import { transformImageLink } from "@/lib/custom-functions";
import { MangaSeries, Mangaka } from "@/lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";

/**
 * Retrieves the selected mangaka
 *
 * @param context GetServerSidePropsContext (retrieves the mangaka name slug)
 * @returns The mangaka object and a list of series objects that the mangaka wrote
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;

  const { data, error: mangakaError } = await supabase
    .from("Mangaka")
    .select("*")
    .eq("slug", slug!)
    .single();

  if (mangakaError) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }

  const mangaka = data as Mangaka;

  const { data: seriesList, error: seriesError } = await supabase
    .from("MangaSeries")
    .select(`
    *,
    mangaka (
      name,
      slug
    )
    `)
    .eq("mangaka", mangaka.id);

  if (seriesError) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }

  return {
    props: {
      mangaka: mangaka,
      seriesList: seriesList as MangaSeries[],
    },
  };
}

/**
 * Selected Mangaka Page
 *
 * @param param0 ServerSideProps
 * @returns MangakaPage component
 */
export default function MangakaPage({
  mangaka,
  seriesList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <HeadComponent
        title={`${mangaka?.name} | Mangaka Bonanza`}
        description={`${mangaka?.bio?.substring(0, 140)}...`}
      />
      <div className="flex flex-col pb-8">
        {/** Selected Mangaka Page Section */}
        <section className="flex mt-16 mx-auto flex-col place-items-center">
          {/** Desktop Design */}
          <div className="flex flex-col md:flex-row md:gap-12">
            <Image
              src={transformImageLink(
                mangaka?.image_url ?? "",
                536,
                360
              )}
              alt={
                mangaka.name ?? ""
              }
              height={536}
              width={536}
            />

            <div className="flex flex-col place-items-center gap-y-5 pt-5 md:pt-0 md:place-items-start md:space-y-4 md:place-content-start">
              {/** Mangaka Name */}
              <div className="font-libreFranklin text-3xl leading-none">
                {mangaka?.name}
              </div>

              {/** Date of Birth */}
              <div className="text-base md:text-xl">
                <b>Date of Birth:</b> {` ${mangaka?.dob}`}
              </div>

              {/** Birth Place */}
              <div className="text-base md:text-xl">
                <b>Birth Place:</b> {` ${mangaka?.birth_place}`}
              </div>

              {/** First Manga */}
              <div className="text-base md:text-xl">
                <b>First Manga:</b> {` ${mangaka?.first_manga_title}`}
              </div>

              {/** Most Recent Manga */}
              <div className="text-base md:text-xl">
                <b>Most Recent Manga:</b>{" "}
                {` ${mangaka?.most_recent_manga}`}
              </div>

              {/** Tags */}
              <div className="flex flex-row gap-4">
                {seriesList[0]?.genres?.map(
                  (genre) => (
                    <div key={genre}>
                      <GenreTag genre={genre} />
                    </div>
                  )
                )}
              </div>

              {/** Mangaka Bio */}
              <div className="text-base max-w-lg md:max-w-md md:min-h-[120px]">
                {mangaka?.bio}
              </div>
            </div>
          </div>

          {/** Mobile design */}
        </section>

        <SectionDivider />

        <SeriesGrid
          seriesList={seriesList}
          gridTitle={`${mangaka?.name}'s Work`}
        />
      </div>
    </>
  );
}
