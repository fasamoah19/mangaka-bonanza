import { Manga } from "@/lib/types";
import GenreTag from "./GenreTag";
import { motion } from "framer-motion";
import Image from "next/image";

/** Necessary props for this component */
type SpotlightOfTheWeekHeroProps = {
  manga: Manga;
};

/**
 * Spotlight of the week hero compoenent
 *
 * @param param0 Selected manga to display in the Hero section
 * @returns SpotlightOfTheWeekHero component
 */
export default function SpotlightOfTheWeekHero({
  manga,
}: SpotlightOfTheWeekHeroProps) {
  return (
    <section className="flex mt-5 mx-auto flex-col place-items-center">
      <div className="text-xl my-6 font-libreFranklin">
        Spotlight of the Week
      </div>
      <motion.div layout className="flex gap-12">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
            manga.attributes?.image.data.attributes?.url
          }`}
          className="shadow-md"
          height={420}
          width={280}
          alt={manga.attributes?.image.data.attributes?.alternativeText ?? ""}
        />
        <div className="align-top space-y-4 md:space-y-6">
          {/** Manga Name */}
          <div className="font-libreFranklin text-3xl leading-none">
            {manga?.attributes?.name}
          </div>

          {/** Author Name */}
          <div className="text-xl">
            <b>Author:</b>{" "}
            {` ${manga.attributes?.mangaka.data.attributes?.name}`}
          </div>

          {/** Release Date */}
          <div className="text-xl">
            <b>Release Date:</b>
            {` ${manga.attributes?.release_date}`}
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
          <div className="text-sm max-w-xl">
            {`${manga.attributes?.summary}`}
          </div>

          <div className="flex flex-row space-x-5 pt-0.5">
            <motion.button
              className="w-48 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
              whileHover={{
                scale: 0.9,
              }}
            >
              Buy
            </motion.button>

            <motion.button
              className="w-48 h-12 md:h-14 bg-siteLightGray font-libreFranklin text-black font-semibold"
              whileHover={{
                scale: 0.9,
              }}
            >
              View More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
