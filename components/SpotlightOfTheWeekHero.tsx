import { Manga } from "@/lib/types";
import GenreTag from "./GenreTag";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartContext, useSetCartContext } from "@/context/CartContextProvider";
import { transformImageLink } from "@/lib/custom-functions";

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
  const value = useCartContext()
  const setValue = useSetCartContext()

  return (
    <section className="flex mt-5 flex-col place-items-center">
      <div className="text-xl my-6 font-libreFranklin">
        Spotlight of the Week
      </div>
      <motion.div layout className="flex gap-12 md:flex-row flex-col place-items-center">
        <Link href={`/mangas/${manga.attributes?.slug}`}>
          <Image
            src={transformImageLink(manga.attributes?.cloudinary_url ?? "", 280, 420)}
            className="shadow-md"
            height={420}
            width={280}
            alt={`${manga.attributes?.name} Manga Cover`}
          />
        </Link>

        <div className="md:align-top space-y-4 md:space-y-6 place-items-center">
          {/** Manga Name */}
          <div className="font-libreFranklin text-3xl leading-none flex flex-row place-content-center md:place-content-start">
            {manga?.attributes?.name}
          </div>

          {/** Author Name */}
          <div className="text-base md:text-xl place-content-center flex flex-row gap-2 md:place-content-start">
            <b>Author:</b>
            {`${manga.attributes?.mangaka.data.attributes?.name}`}
          </div>

          {/** Release Date */}
          <div className="text-base md:text-xl flex flex-row gap-2 place-content-center md:place-content-start">
            <b>Release Date:</b>
            {`${manga.attributes?.release_date}`}
          </div>

          {/** Tags */}
          <div className="flex flex-row gap-4 place-content-center md:place-content-start">
            {manga.attributes?.genres.map((genre) => (
              <div key={genre}>
                <GenreTag genre={genre} />
              </div>
            ))}
          </div>

          {/** Summary */}
          <div className="text-sm md:max-w-xl flex flex-row place-content-center md:place-content-start">
            {`${manga.attributes?.summary}`}
          </div>

          {/** Buttons */}
          <div className="flex flex-col md:flex-row md:gap-x-5 pt-0.5 gap-y-5 place-items-center md:place-content-start justify-between">
            <motion.button
              className="w-52 md:w-48 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
              whileHover={{
                scale: 0.9,
              }}
              onClick={() => setValue([...value, manga.id])}
            >
              Buy
            </motion.button>

            <Link href={`/mangas/${manga.attributes?.slug}`}>
              <motion.button
                className="w-52 md:w-48 h-12 md:h-14 bg-siteLightGray font-libreFranklin text-black font-semibold"
                whileHover={{
                  scale: 0.9,
                }}
              >
                View More
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
