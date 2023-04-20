import { Manga } from "@/lib/types";
import StarIcon from "./icons/StarIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { motion } from "framer-motion";

/** Props necessary for the component */
type MangaItemProps = {
  manga: Manga;
};

/**
 * Manga Component Item
 *
 * @param param0 Manga item to display
 * @returns
 */
export default function MangaItem({ manga }: MangaItemProps) {
  return (
    <div className="flex flex-col w-52 h-112 bg-mangaCard shadow-md">
      {/** Manga Cover */}
      <Link href={`/mangas/${manga.attributes?.slug}`}>
        {" "}
        {/* TODO: Navigate to selected manga page */}
        <motion.img
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
            manga.attributes?.image.data.attributes?.url
          }`}
          className="w-52 h-72"
        />
      </Link>

      {/** Manga Information */}
      <div className="flex flex-col py-4 text-sm px-2 space-y-2">
        <Link href={`/mangas/${manga.id}`}>
          <div className="text-sm font-semibold">{manga.attributes?.name}</div>
        </Link>
        <Link href={"#"}> {/* TODO: Navigate to mangaka page */}</Link>
        <div className="text-xs">{`By: ${manga.attributes?.mangaka.data.attributes?.name}`}</div>
        <div className="font-semibold text-xs">{ manga.attributes?.price ? `$${manga.attributes?.price}` : ""}</div>
        <div className="flex flex-row space-x-2 place-items-center text-siteGray">
          {Array.from(Array(4).keys()).map((_, index) => (
            <div key={`${manga.attributes?.name}-${index}`}>
              <StarIcon />
            </div>
          ))}
          <div className="text-xs">(28)</div>
        </div>
      </div>

      {/** Buttons */}
      {manga.attributes?.in_print ? (
        <div className="flex flex-row">
          <motion.button
            className="flex w-1/2 h-7 bg-siteRed place-content-center place-items-center"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <CartIcon />
          </motion.button>
          <motion.button
            className="flex w-1/2 h-7 bg-siteLightGray place-content-center place-items-center"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <BookmarkIcon />
          </motion.button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
