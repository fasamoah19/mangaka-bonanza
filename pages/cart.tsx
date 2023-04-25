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
import { strapiFetch } from "@/lib/custom-functions";

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
  const [recommended, setRecommended] = useState<Manga[]>([])

  /**
   * Helper function that retrieves the mangas within the cart
   * by their ID
   *
   * @param cart IDs of the manga in the cart
   * @returns list of mangas
   */
  async function getMangas(cart: number[]) {
    const query = qs.stringify(
      {
        filters: {
          id: {
            $eq: cart,
          },
        },
        populate: {
          image: true,
          mangaka: {
            populate: ["name"],
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const response = await strapiFetch(process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!, query)
    const mangaObjects = await response.json();
    const data = mangaObjects.data as Manga[];

    return data;
  }

  /**
   * Gets a list of manga to display in the recommended section. This function
   * retrieves the list of manga in the users cart and gathers the genres. From those genres,
   * it will pull a list of manga within that genre that are NOT the manga within the users cart
   * 
   * @returns list of Manga objects
   */
  async function getRecommended() {
    const genres = new Set(mangas.map((manga) => manga.attributes?.genres).flat())
    const query = qs.stringify({
      pagination: {
        page: 1,
        pageSize: 12
      },
      filters: {
        id: {
          $ne: mangas.length > 0 ? mangas.map((manga) => manga.id) : [0]
        },
        genres: {
          $in: mangas.length > 0 ? genres : "Comedy"
        },
        series_name: {
          $notIn: mangas.map((manga) => manga.attributes?.series_name)
        },
        in_print: true
      },
      populate: {
        image: true,
        mangaka: true
      }
    }, {encodeValuesOnly: true})

    const response = await strapiFetch(process.env.NEXT_PUBLIC_STRAPI_API_MANGAS_PATH!, query)

    const mangaObjects = await response.json();
    const data = mangaObjects.data as Manga[]
    // Filters to show only one volume from a manga series
    const filteredMangas = data.filter((manga, index, self) => {
      return (
        self.findIndex(
          (v) => v.attributes?.series_name === manga.attributes?.series_name
        ) === index
      );
    }).splice(0, 4)

    return filteredMangas;
  }

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
    const getData = async () => {
      const data = await getMangas(cart);
      setMangas(data);
      setLoading(false);
      updateTotal();
      getRecommendedData()
    };

    const getRecommendedData = async () => {
      const recommendedData = await getRecommended()
      setRecommended(recommendedData)
    }

    if (mangas.length == 0 && cart.length > 0) {
      getData();
    } else {
      if (recommended.length == 0) {
        console.log("Running")
        getRecommendedData()
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
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-11 place-items-center">
            <div className="flex flex-row font-libreFranklin text-xl">
              No Items in Cart
            </div>
            <div className="flex flex-row gap-x-4">
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
            </div>
          </div>
        )}
      </section>

      <SectionDivider />

      {/** Recommended */}
      <MangaGrid mangas={recommended} gridTitle={"Recommendations"} titleColor={"text-siteGray"} />
    </div>
  );
}
