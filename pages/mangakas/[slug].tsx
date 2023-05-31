import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import HeadComponent from "@/components/HeadComponent";
import SeriesGrid from "@/components/SeriesGrid";
import { strapiFetch, transformImageLink } from "@/lib/custom-functions";
import { MangaSeries, Mangaka } from "@/lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import qs from "qs";

/**
 * Retrieves the selected mangaka
 *
 * @param context GetServerSidePropsContext (retrieves the mangaka name slug)
 * @returns The mangaka object and a list of series objects that the mangaka wrote
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        manga: {
          populate: ["image", "mangaka"],
        },
        image: true,
        manga_series: {
          populate: ["firstCover", "mangaka"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await strapiFetch(
    process.env.NEXT_PUBLIC_STRAPI_API_MANGAKAS_PATH!,
    query
  );

  const mangakaObject = await response.json();
  const mangaka = mangakaObject.data[0] as Mangaka;
  const seriesList = mangaka.attributes?.manga_series.data as MangaSeries[];

  return {
    props: {
      mangaka: mangaka,
      seriesList: seriesList,
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
        title={`${mangaka.attributes?.name} | Mangaka Bonanza`}
        description={`${mangaka.attributes?.bio.substring(0, 140)}...`}
      />
      <div className="flex flex-col pb-8">
        {/** Selected Mangaka Page Section */}
        <section className="flex mt-16 mx-auto flex-col place-items-center">
          {/** Desktop Design */}
          <div className="flex flex-col md:flex-row md:gap-12">
            <Image
              src={transformImageLink(mangaka.attributes?.cloudinary_url ?? "", 536, 360)}
              alt={
                mangaka.attributes?.image.data.attributes?.alternativeText ?? ""
              }
              height={536}
              width={536}
            />

            <div className="flex flex-col place-items-center gap-y-5 pt-5 md:pt-0 md:place-items-start md:space-y-4 md:place-content-start">
              {/** Mangaka Name */}
              <div className="font-libreFranklin text-3xl leading-none">
                {mangaka.attributes?.name}
              </div>

              {/** Date of Birth */}
              <div className="text-base md:text-xl">
                <b>Date of Birth:</b> {` ${mangaka.attributes?.date_of_birth}`}
              </div>

              {/** Birth Place */}
              <div className="text-base md:text-xl">
                <b>Birth Place:</b> {` ${mangaka.attributes?.birth_place}`}
              </div>

              {/** First Manga */}
              <div className="text-base md:text-xl">
                <b>First Manga:</b> {` ${mangaka.attributes?.firstMangaTitle}`}
              </div>

              {/** Most Recent Manga */}
              <div className="text-base md:text-xl">
                <b>Most Recent Manga:</b>{" "}
                {` ${mangaka.attributes?.mostRecentMangaTitle}`}
              </div>

              {/** Tags */}
              <div className="flex flex-row gap-4">
                {mangaka.attributes?.manga.data[0].attributes?.genres.map(
                  (genre) => (
                    <div key={genre}>
                      <GenreTag genre={genre} />
                    </div>
                  )
                )}
              </div>

              {/** Mangaka Bio */}
              <div className="text-base max-w-lg md:max-w-md md:min-h-[120px]">
                {mangaka.attributes?.bio}
              </div>
            </div>
          </div>

          {/** Mobile design */}
        </section>

        <SectionDivider />

        <SeriesGrid
          seriesList={seriesList}
          gridTitle={`${mangaka.attributes?.name}'s Work`}
        />
      </div>
    </>
  );
}
