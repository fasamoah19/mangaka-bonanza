import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import MangaGrid from "@/components/MangaGrid";
import ReviewItem from "@/components/ReviewItem";
import Tooltip from "@/components/Tooltip";
import StarIcon from "@/components/icons/StarIcon";
import { strapiFetch } from "@/lib/custom-functions";
import { Manga } from "@/lib/types";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";

/**
 * Helper function that retrieves the manga selected by the user
 *
 * @param id Id of the selected manga
 * @returns Manga object
 */
async function getSelectedManga(slug: string) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        image: true,
        mangaka: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await strapiFetch(
    process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!,
    query
  );
  const selectedMangaObject = await response.json();
  const selectedManga = selectedMangaObject.data[0] as Manga;

  return selectedManga;
}
/**
 * Helper function that retrieves manga titles that are similar in genre
 *
 * @param selectedManga Manga object of the selected manga
 * @returns Array of manga objects that are similar in genre
 */
async function getSimilarTitles(selectedManga: Manga) {
  const query = qs.stringify(
    {
      populate: {
        image: true,
        mangaka: true,
      },
    },
    { encodeValuesOnly: true }
  );

  const responseSimilarTitles = await strapiFetch(
    process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!,
    query
  );
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;

  const selectedManga = await getSelectedManga(slug as string);
  const similarTitles = await getSimilarTitles(selectedManga);

  return {
    props: {
      manga: selectedManga,
      similarTitles: similarTitles,
    },
  };
}

/**
 * Selected Manga Page
 *
 * @param param0 Manga object and an array of similar manga titles
 * @returns SelectedMangaPage component
 */
export default function SelectedMangaPage({
  manga,
  similarTitles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const review = {
    reviwer: "Deron S.",
    rating: 4,
    title: "Lorem Ipsum",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.",
  };
  return (
    <div className="flex flex-col">
      {/** Selected Manga Information Section */}
      <section className="flex flex-col md:flex-row pt-16 md:mx-auto">
        {/** Mobile Design */}
        <div className="flex flex-col md:hidden gap-y-5 place-items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
              manga.attributes?.image.data.attributes?.url
            }`}
            className="object-cover"
            height={536}
            width={360}
            alt={manga.attributes?.image.data.attributes?.alternativeText ?? ""}
          />

          {/** Title */}
          <div className="text-4xl leading-none text-black">
            {manga.attributes?.name}
          </div>
          {/** Author */}
          <Tooltip label="View mangaka">
            <Link
              href={`/mangakas/${manga.attributes?.mangaka.data.attributes?.slug}`}
            >
              <div className="text-base md:text-xl">
                <b>Author:</b>
                {` ${manga.attributes?.mangaka.data.attributes?.name}`}
              </div>
            </Link>
          </Tooltip>

          {/** Series Name */}
          <Tooltip label="View manga series">
            <Link href={`/series/${manga.attributes?.slug.split("-vol")[0]}`}>
              <div className="text-base md:text-xl">
                <b>Series Name:</b>
                {` ${manga.attributes?.series_name}`}
              </div>
            </Link>
          </Tooltip>

          {/** Release Date */}
          <div className="text-base md:text-xl">
            <b>Release Date:</b>
            {` ${manga.attributes?.release_date}`}
          </div>

          {/** Rating */}
          <div className="text-base md:text-xl flex flex-row place-items-center gap-x-2">
            <b>Rating: </b>
            <div className="flex flex-row gap-x-1">
              {Array.from(Array(4).keys()).map((_, index) => (
                <div key={`${manga.attributes?.name}-${index}`}>
                  <StarIcon />
                </div>
              ))}
            </div>
            <div className="text-sm text-siteGray">(28)</div>
          </div>

          {/** Tags */}
          <div className="flex flex-row gap-4">
            {manga.attributes?.genres.map((genre) => (
              <div key={genre}>
                <GenreTag genre={genre} />
              </div>
            ))}
          </div>

          {/** Summary */}
          <div className="text-base max-w-lg">
            {`${manga.attributes?.summary}`}
          </div>

          <motion.button
            className="h-14 w-52 bg-siteRed text-white font-libreFranklin font-semibold"
            whileHover={{ scale: 0.9 }}
          >
            Buy
          </motion.button>

          <motion.button
            className="h-14 w-52 bg-siteLightGray text-black font-libreFranklin font-semibold"
            whileHover={{ scale: 0.9 }}
          >
            Bookmark
          </motion.button>
        </div>

        {/** Desktop Design */}
        <div className="hidden md:flex md:flex-row">
          {/** Manga Information  */}
          <div className="hidden md:flex md:flex-col gap-y-7">
            {/** Title */}
            <div className="text-4xl leading-none text-black">
              {manga.attributes?.name}
            </div>
            {/** Author */}
            <Tooltip label="View mangaka">
              <Link
                href={`/mangakas/${manga.attributes?.mangaka.data.attributes?.slug}`}
              >
                <div className="text-xl">
                  <b>Author:</b>
                  {` ${manga.attributes?.mangaka.data.attributes?.name}`}
                </div>
              </Link>
            </Tooltip>

            {/** Series Name */}
            <Tooltip label="View manga series">
              <Link href={`/series/${manga.attributes?.slug.split("-vol")[0]}`}>
                <div className="text-xl">
                  <b>Series Name:</b>
                  {` ${manga.attributes?.series_name}`}
                </div>
              </Link>
            </Tooltip>

            {/** Release Date */}
            <div className="text-xl">
              <b>Release Date:</b>
              {` ${manga.attributes?.release_date}`}
            </div>

            {/** Rating */}
            <div className="text-xl flex flex-row place-items-center gap-x-2">
              <b>Rating: </b>
              <div className="flex flex-row gap-x-1">
                {Array.from(Array(4).keys()).map((_, index) => (
                  <div key={`${manga.attributes?.name}-${index}`}>
                    <StarIcon />
                  </div>
                ))}
              </div>
              <div className="text-sm text-siteGray">(28)</div>
            </div>

            {/** Tags */}
            <div className="flex flex-row gap-4">
              {manga.attributes?.genres.map((genre) => (
                <div key={genre}>
                  <GenreTag genre={genre} />
                </div>
              ))}
            </div>

            {/** Summary */}
            <div className="text-lg max-w-lg">
              {`${manga.attributes?.summary}`}
            </div>
          </div>

          {/** Spacer */}
          <div className="hidden md:flex md:w-48 lg:w-64"></div>
          {/** Image and buttons */}
          <div className="hidden md:flex md:flex-col gap-y-5">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
                manga.attributes?.image.data.attributes?.url
              }`}
              className="object-cover"
              height={536}
              width={360}
              alt={
                manga.attributes?.image.data.attributes?.alternativeText ?? ""
              }
            />
            <motion.button
              className="h-14 bg-siteRed text-white font-libreFranklin font-semibold"
              whileHover={{ scale: 0.9 }}
            >
              Buy
            </motion.button>

            <motion.button
              className="h-14 bg-siteLightGray text-black font-libreFranklin font-semibold"
              whileHover={{ scale: 0.9 }}
            >
              Bookmark
            </motion.button>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/** Reviews Section */}
      <section className="flex flex-col">
        <div className="flex flex-row place-content-center text-2xl md:text-4xl text-siteRed pb-16">
          Reviews
        </div>
        {/** Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 md:place-items-center md:gap-y-16 md:gap-x-8 lg:gap-x-14">
          {Array.from(Array(4).keys()).map((key) => (
            <div key={key}>
              <ReviewItem
                reviewer={review.reviwer}
                rating={review.rating}
                title={review.title}
                content={review.content}
              />
            </div>
          ))}
        </div>
        {/** Mobile Grid */}
        <div className="grid grid-cols-1 place-items-center gap-y-16 md:hidden">
          {Array.from(Array(2).keys()).map((key) => (
            <div key={key}>
              <ReviewItem
                reviewer={review.reviwer}
                rating={review.rating}
                title={review.title}
                content={review.content}
              />
            </div>
          ))}
        </div>
      </section>

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
