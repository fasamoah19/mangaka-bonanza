import SectionDivider from "@/components/Divider";
import GenreTag from "@/components/GenreTag";
import MangaGrid from "@/components/MangaGrid";
import { Manga, Mangaka } from "@/lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import qs from "qs";

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
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL!}/api/mangakas?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY!}`,
      },
    }
  );

  const mangakaObject = await response.json();
  const mangaka = mangakaObject.data[0] as Mangaka;
  const mangas = mangaka.attributes?.manga.data as Manga[];

  return {
    props: {
      mangaka: mangaka,
      mangas: mangas,
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
  mangas,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const filteredMangas = mangas.filter((manga, index, self) => {
    return (
      self.findIndex(
        (v) => v.attributes?.series_name === manga.attributes?.series_name
      ) === index
    );
  })
  return (
    <div className="flex flex-col pb-8">
      {/** Selected Mangaka Page Section */}
      <section className="flex mt-16 mx-auto flex-col place-items-center">
        {/** Mangaka Information */}
        <div className="flex gap-12">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
              mangaka.attributes?.image.data.attributes?.url
            }`}
            alt={
              mangaka.attributes?.image.data.attributes?.alternativeText ?? ""
            }
            height={536}
            width={536}
          />

          <div className="align-middle space-y-4 md:space-y-6 place-content-center">
            {/** Mangaka Name */}
            <div className="font-libreFranklin text-3xl leading-none">
              {mangaka.attributes?.name}
            </div>

            {/** Date of Birth */}
            <div className="text-xl">
              <b>Date of Birth:</b> {` ${mangaka.attributes?.date_of_birth}`}
            </div>

            {/** Birth Place */}
            <div className="text-xl">
              <b>Birth Place:</b> {` ${mangaka.attributes?.birth_place}`}
            </div>

            {/** First Manga */}
            <div className="text-xl">
              <b>First Manga:</b> {` ${mangaka.attributes?.firstMangaTitle}`}
            </div>

            {/** Most Recent Manga */}
            <div className="text-xl">
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
            <div className="text-md max-w-md min-h-[120px]">
              {mangaka.attributes?.bio}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <MangaGrid
        mangas={filteredMangas}
        gridTitle={`${mangaka.attributes?.name}'s Work`}
        titleColor={"text-siteRed"}
      />
    </div>
  );
}
