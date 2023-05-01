import {
  useCartContext,
  useSetCartContext,
} from "@/context/CartContextProvider";
import { Manga } from "@/lib/types";
import qs from "qs";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import SectionDivider from "@/components/Divider";
import { motion } from "framer-motion";
import MangaGrid from "@/components/MangaGrid";
import { getMangas, getRecommended, strapiFetch } from "@/lib/custom-functions";
import Link from "next/link";

/**
 * This page displays all the items in a users cart
 *
 * @returns Cart Component
 */
export default function CartPage() {
  const cart = useCartContext();
  const setCart = useSetCartContext();

  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [recommended, setRecommended] = useState<Manga[]>([]);

  /** Remove item from cart */
  const removeFromCart = (id: number) => {
    setCart(cart.filter((cartId) => cartId !== id));
    setMangas(mangas.filter((manga) => manga.id !== id));
    updateTotal();
  };

  /** Updates the total displayed on the page */
  const updateTotal = () => {
    let sum = 0;
    mangas.map((manga) => {
      sum = sum + (manga.attributes?.price ?? 0);
    });
    setTotal(sum);
  };

  /**
   * This useEffect function will retrieve the mangas within the cart if the mangas array is empty and the cart
   * array has at least one value.
   *
   * If an item from the cart is removed, this function will re-run, but will only update the total.
   */
  useEffect(() => {
    setLoading(true);

    /** Function that retrieves the manga objects that are in the user's cart */
    const getData = async () => {
      const data = await getMangas(cart);
      setMangas(data);
      setLoading(false);
      updateTotal();
      getRecommendedData();
    };

    /** Function that retrives the manga for the recommended section */
    const getRecommendedData = async () => {
      const recommendedData = await getRecommended(mangas);
      setRecommended(recommendedData);
    };

    if (mangas.length == 0 && cart.length > 0) {
      getData();
    } else {
      if (recommended.length == 0) {
        console.log("Running");
        getRecommendedData();
      }
      setLoading(false);
      updateTotal();
    }
  }, [mangas]);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col mt-5">
      {/** Cart Section */}
      <section className="flex flex-col">
        {/** Page title */}
        <div className="flex flex-row place-content-center text-4xl text-siteRed py-11">
          Cart
        </div>

        {/** Cart Items */}
        {cart.length > 0 ? (
          <div className="flex flex-col gap-y-10">
            <div className="flex flex-col">
              {mangas.map((manga) => (
                <div key={manga.id}>
                  <CartItem
                    manga={manga}
                    quantity={cart.filter((id) => id == manga.id).length}
                    removeFromCart={() => removeFromCart(manga.id)}
                  />
                  <div className="h-3 w-full"></div>
                </div>
              ))}
            </div>

            {/** Total */}
            <div className="flex flex-row place-content-end text-xl font-libreFranklin">
              {`Total: $${total}`}
            </div>

            {/** Checkout button */}
            <div className="flex flex-row place-content-end">
              <Link href="/checkout">
                <motion.button
                  className="w-48 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
                  whileHover={{
                    scale: 0.9,
                  }}
                  whileTap={{
                    scale: 0.7,
                  }}
                >
                  Checkout
                </motion.button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-11 place-items-center">
            <div className="flex flex-row font-libreFranklin text-xl">
              No Items in Cart
            </div>
            <div className="flex flex-row gap-x-4">
              <Link href="/">
                <motion.button
                  className="w-56 h-12 md:h-14 bg-siteRed font-libreFranklin text-white font-semibold"
                  whileHover={{
                    scale: 0.9,
                  }}
                  whileTap={{
                    scale: 0.7,
                  }}
                >
                  Check out some manga
                </motion.button>
              </Link>
            </div>
          </div>
        )}
      </section>

      <SectionDivider />

      {/** Recommended */}
      <MangaGrid
        mangas={recommended}
        gridTitle={"Recommendations"}
        titleColor={"text-siteGray"}
      />
    </div>
  );
}
