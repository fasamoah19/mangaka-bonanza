import { Manga, Mangaka } from "@/lib/types";
import StarIcon from "./icons/StarIcon";
import BookmarkIcon from "./icons/BookmarkIcon";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import RemoveFromCartIcon from "./icons/RemoveFromCartIcon";
import { useState } from "react";
import {
  useCartContext,
  useSetCartContext,
} from "@/context/CartContextProvider";
import Tooltip from "./Tooltip";
import { transformImageLink } from "@/lib/custom-functions";

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
  // Context for the values in the cart array
  const cart = useCartContext();
  // Context for the function that adds and removes values from the cart array
  const setCart = useSetCartContext();

  return (
    <div className="flex flex-col w-52 h-112 bg-mangaCard shadow-md">
      {/** Manga Cover */}
      <Link href={`/mangas/${manga?.slug}`}>
        {/* TODO: Navigate to selected manga page */}
        <motion.img
          src={transformImageLink(manga?.image_url ?? "", 208, 288)}
          className="w-52 h-72"
          height={'288px'}
          width={'208px'}
          alt={`${manga?.name} Manga Cover`}
        />
      </Link>

      {/** Manga Information */}
      <div className="flex flex-col py-5 text-sm px-2 space-y-2">
        <Tooltip label="View manga details" decreaseY={true}>
          <Link href={`/mangas/${manga?.slug}`}>
            <div className="text-sm font-semibold">
              {manga?.name}
            </div>
          </Link>
        </Tooltip>

        <Tooltip label="View mangaka" decreaseY={true}>
          <Link
            href={`/mangakas/${(manga?.mangaka as unknown as Mangaka).slug}`}
          >
            <div className="text-xs">{`By: ${(manga?.mangaka as unknown as Mangaka).name}`}</div>
          </Link>
        </Tooltip>

        <div className="font-semibold text-xs">
          {manga?.price ? `$${manga?.price}` : ""}
        </div>
        <div className="flex flex-row space-x-2 place-items-center text-siteGray">
          {Array.from(Array(4).keys()).map((_, index) => (
            <div key={`${manga?.name}-${index}`}>
              <StarIcon />
            </div>
          ))}
          <div className="text-xs text-black">(28)</div>
        </div>
      </div>

      {/** Buttons */}
      {manga?.in_print ? (
        <div className="flex flex-row">
          <Tooltip
            label="Add to cart"
            width="w-1/2"
            height="h-7"
            display="flex"
          >
            <motion.button
              layout
              id={`${manga.name}-checkout-button`}
              aria-label={`${manga.name}-checkout-button`}
              className="flex w-full h-full bg-siteRed place-content-center place-items-center"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={(event) => {
                event.preventDefault();
                let newCart = [...cart, manga.id];
                if (cart.includes(manga.id)) {
                  newCart = cart.filter((id) => id !== manga.id);
                }
                setCart(newCart);
              }}
            >
              {cart.includes(manga.id) ? <RemoveFromCartIcon /> : <CartIcon />}
            </motion.button>
          </Tooltip>

          <Tooltip
            label="Add to bookmarks"
            width="w-1/2"
            height="h-7"
            display="flex"
          >
            <motion.button
              id={`${manga.name}-bookmark-button`}
              aria-label={`${manga.name}-bookmark-button`}
              className="flex w-full h-full bg-siteLightGray place-content-center place-items-center"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <BookmarkIcon />
            </motion.button>
          </Tooltip>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
