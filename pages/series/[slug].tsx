import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import HeadComponent from "@/components/HeadComponent";
import MangaGrid from "@/components/MangaGrid";
import Tooltip from "@/components/Tooltip";
import { supabase } from "@/lib/api";
import { transformImageLink } from "@/lib/custom-functions";
import { Manga, Mangaka } from "@/lib/types";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";

/**
 * Helper function that retrieves manga titles that are similar in genre
 *
 * @param selectedManga Manga object of the selected manga
 * @returns Array of manga objects that are similar in genre
 */
async function getSimilarTitles(selectedManga: Manga) {

  const { data: mangas, error } = await supabase
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

  const similarTitles = (mangas as Manga[])
    .filter(
      (manga) =>
        manga?.genres?.filter((genre) =>
          selectedManga?.genres?.includes(genre)
        ).length && selectedManga?.name !== manga?.name
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
  const { data: mangaSeries, error } = await supabase
    .from('MangaSeries')
    .select(`
      *,
      mangaka (
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    return {
      redirect: {
        destination: '/500'
      }
    }
  }

  const { data, error: mangaError } = await supabase
    .from('Manga')
    .select(`
      *,
      mangaka (
        name,
        slug
      )
    `)
    .eq('manga_series', mangaSeries.id)

  if (mangaError) {
    return {
      redirect: {
        destination: '/500'
      }
    }
  }

  const mangas = data as Manga[]

  return { mangaSeries, mangas };
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;
  const { mangaSeries, mangas } = await getMangaSeries(slug as string);

  if (!mangas) {
    return {
      redirect: {
        destination: '/500'
      }
    }
  }

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
    <>
      <HeadComponent title={`${mangaSeries?.name} | Mangaka Bonanza`} description={`${mangaSeries?.summary?.substring(0, 140)}...`} />
      <div className="flex flex-col pb-8">
        {/** Manag Series Section */}
        <section className="flex mt-16 md:mx-auto flex-col place-items-center">
          <div className="hidden md:flex md:gap-12">
            <Image
              src={transformImageLink(mangaSeries?.first_cover_url ?? "", 280, 420)}
              alt={`${mangaSeries?.name} First Cover`}
              height={420}
              width={280}
            />
            <div className="align-top space-y-4 md:space-y-6">
              {/** Manga Name */}
              <div className="font-libreFranklin text-3xl leading-none">
                {mangaSeries?.name}
              </div>

              {/** Author Name */}
              <div className="text-xl">
                <Tooltip label="Click to view mangaka">
                  <Link
                    href={`/mangakas/${(mangaSeries?.mangaka as unknown as Mangaka)?.slug}`}
                  >
                    <b>Author:</b>{" "}
                    {` ${(mangaSeries?.mangaka as unknown as Mangaka)?.name}`}
                  </Link>
                </Tooltip>
              </div>

              {/** Release Date */}
              <div className="text-xl">
                <b>Release Date:</b>
                {` ${mangas[0]?.release_date}`}
              </div>

              {/** Tags */}
              <div className="flex flex-row gap-4">
                {mangaSeries?.genres?.map((genre) => (
                  <div key={genre}>
                    <GenreTag genre={genre} />
                  </div>
                ))}
              </div>

              {/** Summary */}
              <div className="text-sm max-w-lg min-h-[120px]">
                {`${mangaSeries?.summary}`}
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

                <Link href={`/mangas/${mangas[0]?.slug}`}>
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

          {/** Mobile design */}
          <div className="flex flex-col gap-y-5 place-items-center md:hidden">
            <Image
              alt={`${mangaSeries?.name} First Cover`}
              src={transformImageLink(mangaSeries?.first_cover_url ?? "", 280, 420)}
              height={420}
              width={280}
            />
            {/** Manga Name */}
            <div className="font-libreFranklin text-3xl leading-none">
              {mangaSeries?.name}
            </div>

            {/** Author Name */}
            <div className="text-base md:text-xl">
              <Link
                href={`/mangakas/${(mangaSeries?.mangaka as unknown as Mangaka)?.slug}`}
              >
                <b>Author:</b>{" "}
                {` ${(mangaSeries?.mangaka as unknown as Mangaka)?.name}`}
              </Link>
            </div>

            {/** Release Date */}
            <div className="text-base md:text-xl">
              <b>Release Date:</b>
              {` ${mangas[0]?.release_date}`}
            </div>

            {/** Tags */}
            <div className="flex flex-row gap-4">
              {mangaSeries?.genres?.map((genre) => (
                <div key={genre}>
                  <GenreTag genre={genre} />
                </div>
              ))}
            </div>

            {/** Summary */}
            <div className="text-base max-w-lg">
              {`${mangaSeries?.summary}`}
            </div>

            <motion.button
              className="w-52 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
              whileHover={{
                scale: 0.9,
              }}
            >
              Buy
            </motion.button>

            <Link href={`/mangas/${mangas[0]?.slug}`}>
              <motion.button
                className="w-52 h-12 md:h-14 bg-siteLightGray font-libreFranklin text-black font-semibold"
                whileHover={{
                  scale: 0.9,
                }}
              >
                View More
              </motion.button>
            </Link>
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
    </>
  );
}
