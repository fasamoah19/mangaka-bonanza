import { InferGetServerSidePropsType } from "next";
import { Manga } from "@/lib/types";
import { useState } from "react";
import SpotlightOfTheWeekHero from "@/components/SpotlightOfTheWeekHero";
import SectionDivider from "@/components/Divider";
import MangaItem from "@/components/MangaItem";
import Tooltip from "@/components/Tooltip";
import HeadComponent from "@/components/HeadComponent";
import { supabase } from "@/lib/api";

/**
 * Function that will retrieve all (via pagination) manga to display on the home page
 *
 * @returns Manga data from Strapi
 */
export async function getServerSideProps() {
  const { data: mangas, error } = await supabase
    .from("Manga")
    .select(
      `
    *,
    mangaka (
      name,
      slug
    )
    `
    )
    .eq("in_print", true)
    .limit(50);

  if (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }

  return {
    props: {
      mangas: mangas as Manga[],
      spotlightIndex: Math.floor(Math.random() * (50 - 0) + 0) // Generates a random index
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
  spotlightIndex
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const spotlightOfTheWeekManga: Manga = mangas[spotlightIndex];
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
    <>
      <HeadComponent title="Home | Mangaka Bonanza" />
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
              <Tooltip label={`${filter} Manga`} key={filter}>
                <div
                  className="font-libreFranklin text-base hover:cursor-pointer"
                  onClick={() => setHighlightFilter(filter)}
                  style={{
                    color: highlightFilter == filter ? "#D21416" : "black",
                  }}
                >
                  {filter}
                </div>
              </Tooltip>
            ))}
          </div>

          <div className="flex flex-row justify-between md:hidden">
            {filterTags.slice(0, 3).map((filter) => (
              <Tooltip label={`${filter} Manga`} key={filter}>
                <div
                  className="font-libreFranklin text-base hover:cursor-pointer"
                  onClick={() => setHighlightFilter(filter)}
                  style={{
                    color: highlightFilter == filter ? "#D21416" : "black",
                  }}
                >
                  {filter}
                </div>
              </Tooltip>
            ))}
          </div>

          {/** Title */}
          <div className="flex flex-row place-content-center text-2xl md:text-4xl text-siteRed py-11">
            {titles[filterTags.indexOf(highlightFilter)]}
          </div>

          {/** List of Manga */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-16 md:gap-x-8 lg:gap-x-14">
            {/** Manga Item */}
            {mangas
              .filter((manga) => manga?.in_print == true)
              .filter((manga) => {
                if (highlightFilter == "New") {
                  return manga.release_date?.includes("2023");
                } else {
                  return manga?.genres?.includes(highlightFilter);
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
    </>
  );
}
