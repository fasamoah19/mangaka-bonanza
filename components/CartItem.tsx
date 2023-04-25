import { Manga } from "@/lib/types";
import Image from "next/image";

/** Props necessary for this component */
type CartItemProps = {
  manga: Manga;
  quantity: number;
  removeFromCart: () => void; // function to remove the item from the cart
};

/**
 * A custom component that display an item in the cart
 *
 * @param param0 CartItemProps
 * @returns CartItem component
 */
export default function CartItem({
  manga,
  quantity,
  removeFromCart,
}: CartItemProps) {
  return (
    <div className="flex flex-row h-40 w-full bg-cartItemBg">
      <div className="flex flex-row space-x-10 place-items-center">
        {/** Manga Cover */}
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
            manga.attributes?.image.data.attributes?.url
          }`}
          className="ml-5 h-32 w-20"
          alt={manga.attributes?.image.data.attributes?.alternativeText ?? ""}
          height={128}
          width={80}
        />
        {/** Manga Name and Author Name */}
        <div className="text-sm font-libreFranklin">{`${manga.attributes?.name} - ${manga.attributes?.mangaka.data.attributes?.name}`}</div>
      </div>
      {/** Spacer */}
      <div className="grow"></div>

      {/** Manga Quantity and Price */}
      <div className="flex flex-row mr-32 space-x-16 place-items-center">
        <div className="text-sm font-libreFranklin">{`Quantity: ${quantity}`}</div>
        <div className="text-sm font-libreFranklin">{`$${manga.attributes?.price}`}</div>
      </div>

      {/** Remove from cart button */}
      <div
        className="flex rounded-sm h-9 w-9 bg-white place-items-center place-content-center hover:cursor-pointer"
        onClick={removeFromCart}
      >
        <div className="font-libreFranklin font-extralight">X</div>
      </div>
    </div>
  );
}