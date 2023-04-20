import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import MangaGrid from "@/components/MangaGrid";
import ReviewItem from "@/components/ReviewItem";
import StarIcon from "@/components/icons/StarIcon";
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL!}/api/mangas/?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY!}`,
      },
    }
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
  const responseSimilarTitles = await fetch(
    `${process.env
      .NEXT_PUBLIC_STRAPI_API_URL!}/api/mangas?populate=mangaka,image`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY!}`,
      },
    }
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
      <section className="flex flex-row pt-16">
        {/** Manga Information  */}
        <div className="flex flex-col gap-y-7">
          {/** Title */}
          <div className="text-4xl leading-none text-black">
            {manga.attributes?.name}
          </div>
          {/** Author */}
          <Link
            href={`/mangakas/${manga.attributes?.mangaka.data.attributes?.slug}`}
          >
            <div className="text-xl">
              <b>Author:</b>
              {` ${manga.attributes?.mangaka.data.attributes?.name}`}
            </div>
          </Link>

          {/** Series Name */}
          <Link href={`/series/${manga.attributes?.slug.split("-vol")[0]}`}>
            <div className="text-xl">
              <b>Series Name:</b>
              {` ${manga.attributes?.series_name}`}
            </div>
          </Link>

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
        <div className="grow"></div>
        {/** Image and buttons */}
        <div className="flex flex-col gap-y-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
              manga.attributes?.image.data.attributes?.url
            }`}
            height={536}
            width={360}
            alt={manga.attributes?.image.data.attributes?.alternativeText ?? ""}
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
      </section>

      <SectionDivider />

      {/** Reviews Section */}
      <section className="flex flex-col">
        <div className="flex flex-row place-content-center text-4xl text-siteRed pb-1">
          Reviews
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-16 md:gap-x-8 lg:gap-x-14">
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
