import { Manga } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";

/** Props necessary for component */
type OrderSummaryProps = {
  mangas: Manga[];
  tax: string;
  total: string;
};

/**
 * Custom component that displays the summary of the users order
 *
 * @param param0 OrderSummaryProps
 * @returns OrderSummary component
 */
export default function OrderSummary({
  mangas,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="flex flex-col place-items-center">
      {/** Order box */}
      <div className="flex flex-col p-6 gap-y-6 bg-siteLightGray h-fit">
        <div className="flex flex-row font-libreFranklin text-lg">Order</div>
        {mangas.length == 0 ? (
          <div>No manga was added to the cart</div>
        ) : (
          <div className="flex flex-col bg-white p-6 md:gap-y-2 gap-y-6 w-60 md:w-80">
            {mangas.map((manga) => (
              <div className="flex flex-row" key={manga.id}>
                <div className="font-libreFranklin text-sm">
                  {manga.attributes?.name}
                </div>
                <div className="grow"></div>
                <div className="font-libreFranklin text-sm">
                  {`$${manga.attributes?.price}`}
                </div>
              </div>
            ))}

            <div className="flex flex-col mt-12 gap-y-4">
              <div className="flex flex-row">
                <div className="font-libreFranklin text-sm">Tax</div>
                <div className="grow"></div>
                <div className="font-libreFranklin text-sm">{`$${tax}`}</div>
              </div>
              <div className="flex flex-row">
                <div className="font-libreFranklin text-sm">Shipping</div>
                <div className="grow"></div>
                <div className="font-libreFranklin text-sm">$5.00</div>
              </div>
            </div>

            <div className="my-6">
              <div className="border-t-2"></div>
            </div>

            <div className="flex flex-row pb-2">
              <div className="font-libreFranklin text-sm">Total</div>
              <div className="grow"></div>
              <div className="font-libreFranklin text-sm">{`$${total}`}</div>
            </div>
          </div>
        )}
      </div>

      {/** Buttons */}
      <div className="flex-col flex mt-8 gap-y-6">
        <motion.button
          className="w-48 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
          type="submit"
          form="order-form"
          whileHover={{
            scale: 0.9,
          }}
        >
          Purchase
        </motion.button>

        <Link href={"/cart"}>
          <motion.button
            className="w-48 h-12 md:h-14 bg-siteLightGray font-libreFranklin text-black font-semibold"
            whileHover={{
              scale: 0.9,
            }}
          >
            Back To Cart
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
