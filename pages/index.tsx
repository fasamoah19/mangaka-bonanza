import { InferGetServerSidePropsType } from "next";
import { Manga } from "@/lib/types";
import { useState } from "react";
import SpotlightOfTheWeekHero from "@/components/SpotlightOfTheWeekHero";
import SectionDivider from "@/components/Divider";
import MangaItem from "@/components/MangaItem";
import qs from "qs";
import { strapiFetch } from "@/lib/custom-functions";

/**
 * Function that will retrieve all (via pagination) manga to display on the home page
 *
 * @returns Manga data from Strapi
 */
export async function getServerSideProps() {
  const query = qs.stringify(
    {
      filters: {
        in_print: {
          $eq: true,
        },
      },
      populate: ["mangaka", "image"],
      pagination: {
        pageSize: 50,
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
  const mangas = await response.json();

  return {
    props: {
      mangas: mangas.data as Manga[],
    },
  };
}

/**
 * Mangaka Bonanaza Home Page
 *
 * @param param0 Props from GetServerSideProps
 * @returns Home Page
 */
export default function Home({
  mangas,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const spotlightOfTheWeekManga: Manga = mangas[12];
  const filterTags = [
    "Action-Adventure",
    "Comedy",
    "Drama",
    "New",
    "Sci-Fi",
    "Sports",
    "Supernatural",
  ];
  const titles = [
    "Action-Adventure",
    "Comedy",
    "Drama",
    "New",
    "Sci-Fi",
    "Sports",
    "Supernatural",
  ];
  const [highlightFilter, setHighlightFilter] = useState<string>("New");

  return (
    <div className="flex flex-col pb-8">
      {/** Spotlight of the Week Hero */}
      <SpotlightOfTheWeekHero manga={spotlightOfTheWeekManga} />
      {/** Spotlight of the Week End */}

      {/** Divider */}
      <SectionDivider />

      {/** Display Mangas Section */}
      <section className="flex flex-col">
        {/** Filter Tags */}
        <div className="md:flex md:flex-row md:justify-between hidden">
          {filterTags.map((filter) => (
            <div
              className="font-libreFranklin text-base hover:cursor-pointer"
              key={filter}
              onClick={() => setHighlightFilter(filter)}
              style={{
                color: highlightFilter == filter ? "#D21416" : "#787878",
              }}
            >
              {filter}
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between md:hidden">
          {filterTags.splice(0, 3).map((filter) => (
            <div
              className="font-libreFranklin text-base hover:cursor-pointer"
              key={filter}
              onClick={() => setHighlightFilter(filter)}
              style={{
                color: highlightFilter == filter ? "#D21416" : "#787878",
              }}
            >
              {filter}
            </div>
          ))}
        </div>

        {/** Title */}
        <div className="flex flex-row place-content-center text-4xl text-siteRed py-11">
          {titles[filterTags.indexOf(highlightFilter)]}
        </div>

        {/** List of Manga */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-16 md:gap-x-8 lg:gap-x-14">
          {/** Manga Item */}
          {mangas
            .filter((manga) => manga.attributes?.in_print == true)
            .filter((manga) => {
              if (highlightFilter == "New") {
                return manga.attributes?.release_date.includes("2023");
              } else {
                return manga.attributes?.genres.includes(highlightFilter);
              }
            })
            .map((manga) => (
              <div key={manga.id}>
                <MangaItem manga={manga} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
