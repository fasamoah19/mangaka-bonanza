import { Libre_Franklin } from "next/font/google";
import { InferGetServerSidePropsType } from "next";
import { Manga } from "@/lib/types";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Image,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import SpotlightOfTheWeekHero from "@/components/SpotlightOfTheWeekHero";
import SectionDivider from "@/components/Divider";
import MangaItem from "@/components/MangaItem";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: "variable",
});

/**
 * Function that will retrieve all (via pagination) manga to display on the home page
 *
 * @returns Manga data from Strapi
 */
export async function getServerSideProps() {
  const response = await fetch(
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
  return (
    <>
      <HomeTailwindCSS mangas={mangas} />
      {/* <HomeChakraUI mangas={mangas} /> */}
    </>
  );
}

type HomeProps = {
  mangas: Manga[];
};
const HomeChakraUI = ({ mangas }: HomeProps) => {
  const spotlightOfTheWeekManga: Manga = mangas[5];
  const filterTags = [
    "Top 20",
    "Shonen",
    "Rising Stars",
    "New",
    "Classics",
    "Comedy",
    "On Sale",
  ];
  const titles = [
    "Top 20",
    "Shonen",
    "Rising Stars",
    "New Releases",
    "Classics",
    "Comedy",
    "On Sale",
  ];
  const [highlightFilter, setHighlightFilter] = useState<string>("New");
  return (
    <Box as="main">
      <Flex direction={"column"}>
        {/** Spotlight of the Week Hero */}
        <Flex
          mt={"20px"}
          as={"section"}
          mx={"auto"}
          direction={"column"}
          align={"center"}
        >
          <Text
            my={"24px"}
            fontSize={20}
            fontFamily={libreFranklin.style.fontFamily}
          >
            Spotlight of the Week
          </Text>
          <Flex gap={12}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
                spotlightOfTheWeekManga.attributes?.image.data.attributes?.url
              }`}
              height={`420px`}
              width={`280px`}
              alt={
                spotlightOfTheWeekManga.attributes?.image.data.attributes
                  ?.alternativeText
              }
            />
            <VStack spacing={6} align={"start"}>
              {/** Manga Name */}
              <Text
                fontFamily={libreFranklin.style.fontFamily}
                fontSize={36}
                lineHeight={"none"}
              >
                {spotlightOfTheWeekManga.attributes?.name}
              </Text>
              {/** Author Name */}
              <Text fontSize={20}>
                <b>Author:</b>
                {` ${spotlightOfTheWeekManga.attributes?.mangaka.data.attributes?.name}`}
              </Text>

              {/** Release Date */}
              <Text fontSize={20}>
                <b>Release Date:</b>
                {` ${spotlightOfTheWeekManga.attributes?.release_date}`}
              </Text>

              {/** Tags */}
              <HStack spacing={4}>
                {spotlightOfTheWeekManga.attributes?.genres.map((genre) => (
                  <Tag
                    boxShadow={"md"}
                    size={"lg"}
                    key={genre}
                    variant={"solid"}
                    colorScheme="yellow"
                    my={1}
                  >
                    {genre}
                  </Tag>
                ))}
              </HStack>

              {/** Summary */}
              <Text fontSize={14} maxWidth={"600px"}>
                {`${spotlightOfTheWeekManga.attributes?.summary}`}
              </Text>

              <ButtonGroup spacing={5} pt={1}>
                <Button
                  width={"198px"}
                  height={"56px"}
                  variant={"unstyled"}
                  bg={"#D21416"}
                  rounded={"none"}
                  color={"white"}
                  fontFamily={libreFranklin.style.fontFamily}
                >
                  Buy
                </Button>

                <Button
                  width={"198px"}
                  height={"56px"}
                  variant={"unstyled"}
                  bg={"#D9D9D9"}
                  rounded={"none"}
                  color={"black"}
                  fontFamily={libreFranklin.style.fontFamily}
                >
                  View More
                </Button>
              </ButtonGroup>
            </VStack>
          </Flex>
        </Flex>
        {/** Spotlight of the Week End */}
        {/** Divider */}
        <Box h={1} />
        <Spacer minHeight={"60px"} />
        <Divider h={1} />
        <Spacer minHeight={"60px"} />

        {/** Display Mangas Section */}
        <Flex direction={"column"}>
          {/** Filters */}
          <HStack justify={"space-between"}>
            {filterTags.map((filter) => (
              <Text
                color={highlightFilter == filter ? "#D21416" : "#787878"}
                fontFamily={libreFranklin.style.fontFamily}
                fontSize={"md"}
                key={filter}
                onClick={() => setHighlightFilter(filter)}
                _hover={{ cursor: "pointer" }}
              >
                {filter}
              </Text>
            ))}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

const HomeTailwindCSS = ({ mangas }: HomeProps) => {
  const spotlightOfTheWeekManga: Manga = mangas[12];
  const filterTags = [
    "Top 20",
    "Shonen",
    "Rising Stars",
    "New",
    "Classics",
    "Comedy",
    "On Sale",
  ];
  const titles = [
    "Top 20",
    "Shonen",
    "Rising Stars",
    "New Releases",
    "Classics",
    "Comedy",
    "On Sale",
  ];
  const [highlightFilter, setHighlightFilter] = useState<string>("New");
  return (
    <div className="flex flex-col">
      {/** Spotlight of the Week Hero */}
      <SpotlightOfTheWeekHero manga={spotlightOfTheWeekManga} />
      {/** Spotlight of the Week End */}

      {/** Divider */}
      <SectionDivider />

      {/** Display Mangas Section */}
      <section className="flex flex-col">
        {/** Filter Tags */}
        <div className="flex flex-row justify-between">
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

        {/** Title */}
        <div className="flex flex-row place-content-center text-4xl text-siteRed py-11">
          {titles[filterTags.indexOf(highlightFilter)]}
        </div>

        {/** List of Manga */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-8 md:gap-x-8 lg:gap-x-14">
          {/** Manga Item */}
          {mangas
            .filter((manga) => manga.attributes?.in_print == true)
            .map((manga) => (
              <div key={manga.id}>
                <MangaItem manga={manga} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
