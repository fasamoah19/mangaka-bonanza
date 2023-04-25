import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import MangaGrid from "@/components/MangaGrid";
import { strapiFetch } from "@/lib/custom-functions";
import { Manga, MangaSeries } from "@/lib/types";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";

/**
 * Helper function that retrieves manga titles that are similar in genre
 *
 * @param selectedManga Manga object of the selected manga
 * @returns Array of manga objects that are similar in genre
 */
async function getSimilarTitles(selectedManga: Manga) {
  const query = qs.stringify({
    populate: {
      image: true,
      mangaka: true
    }
  }, { encodeValuesOnly: true })

  const responseSimilarTitles = await strapiFetch(process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!, query)
  const mangas = await responseSimilarTitles.json();

  const similarTitles = (mangas.data as Manga[])
    .filter(
      (manga) =>
        manga.attributes?.genres.filter((genre) =>
          selectedManga.attributes?.genres.includes(genre)
        ).length && selectedManga.attributes?.name !== manga.attributes.name
    )
    .slice(0, 8)
    .reverse() as Manga[];

  return similarTitles;
}

/**
 * Helper function that retrieves the selected manga series
 *
 * @param series_name Series Name
 * @returns The Manga Series object and a list of Mangas within that series
 */
async function getMangaSeries(slug: string) {
  // Structuring the query to go in the link
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        mangas: {
          populate: ["image", "mangaka"],
        },
        mangaka: true,
        firstCover: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await strapiFetch(process.env.NEXT_PUBLIC_STRAPI_API_MANGA_SERIES_PATH!, query)

  const mangaSeriesObject = await response.json();
  const mangaSeries = mangaSeriesObject.data[0] as MangaSeries;
  const mangas = mangaSeries.attributes?.mangas.data as Manga[];

  return { mangaSeries, mangas };
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;
  const { mangaSeries, mangas } = await getMangaSeries(slug as string);
  const similarTitles = await getSimilarTitles(mangas[0]);

  return {
    props: {
      mangaSeries: mangaSeries,
      mangas: mangas,
      similarTitles: similarTitles,
    },
  };
}

/**
 * Manga Series Page
 *
 * @returns MangaSeriesPage component
 */
export default function MangaSeriesPage({
  mangaSeries,
  mangas,
  similarTitles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col pb-8">
      {/** Manag Series Section */}
      <section className="flex mt-16 mx-auto flex-col place-items-center">
        <div className="flex gap-12">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
              mangaSeries.attributes?.firstCover.data.attributes?.url
            }`}
            alt={
              mangaSeries.attributes?.firstCover.data.attributes
                ?.alternativeText ?? ""
            }
            height={420}
            width={280}
          />
          <div className="align-top space-y-4 md:space-y-6">
            {/** Manga Name */}
            <div className="font-libreFranklin text-3xl leading-none">
              {mangaSeries.attributes?.name}
            </div>

            {/** Author Name */}
            <div className="text-xl">
              <Link
                href={`/mangakas/${mangaSeries.attributes?.mangaka.data.attributes?.slug}`}
              >
                <b>Author:</b>{" "}
                {` ${mangaSeries.attributes?.mangaka.data.attributes?.name}`}
              </Link>
            </div>

            {/** Release Date */}
            <div className="text-xl">
              <b>Release Date:</b>
              {` ${mangas[0].attributes?.release_date}`}
            </div>

            {/** Tags */}
            <div className="flex flex-row gap-4">
              {mangaSeries.attributes?.genres.map((genre) => (
                <div key={genre}>
                  <GenreTag genre={genre} />
                </div>
              ))}
            </div>

            {/** Summary */}
            <div className="text-sm max-w-lg min-h-[120px]">
              {`${mangaSeries.attributes?.summary}`}
            </div>

            {/** Buttons */}
            <div className="flex flex-row space-x-5 pt-0.5">
              <motion.button
                className="w-48 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
                whileHover={{
                  scale: 0.9,
                }}
              >
                Buy
              </motion.button>

              <Link href={`/mangas/${mangas[0].attributes?.slug}`}>
                <motion.button
                  className="w-48 h-12 md:h-14 bg-siteLightGray font-libreFranklin text-black font-semibold"
                  whileHover={{
                    scale: 0.9,
                  }}
                >
                  View More
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/** The series section */}
      <MangaGrid
        gridTitle="The Series"
        mangas={mangas}
        titleColor={"text-siteRed"}
      />

      <SectionDivider />

      {/** Similar Titles Section */}
      {similarTitles.length > 0 ? (
        <MangaGrid
          gridTitle="Similar Titles"
          mangas={similarTitles}
          titleColor={"text-siteGray"}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
