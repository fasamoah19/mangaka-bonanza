import SectionDivider from "@/components/Divider";
import CityField from "@/components/form/CityField";
import CvvField from "@/components/form/CvvField";
import ExpiryDateFields from "@/components/form/ExpiryDateFields";
import InputFieldLong from "@/components/form/InputFieldLong";
import StateField from "@/components/form/StateField";
import ZipCodeField from "@/components/form/ZipCodeField";
import { useCartContext } from "@/context/CartContextProvider";
import { getMangas, getRecommended } from "@/lib/custom-functions";
import { Manga } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type PaymentType = "apple-pay" | "google-pay" | "cc" | "pay-pal";

/**
 * Checkout Page
 *
 * @returns CheckoutPage component
 */
export default function CheckoutPage() {
  const cart = useCartContext();

  const [mangas, setMangas] = useState<Manga[]>([]);
  const [recommended, setRecommended] = useState<Manga[]>([]);
  const [total, setTotal] = useState<string>("");
  const [tax, setTax] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("apple-pay");

  /** Updates the total displayed on the page */
  const updateTotal = () => {
    let sum = 0;
    let shipping = 5.0;
    mangas.map((manga) => {
      sum = sum + (manga.attributes?.price ?? 0);
    });
    let floatTax = parseFloat((sum * 0.06).toFixed(2));
    if (floatTax.toString().split(".").length > 1) {
      setTax(
        floatTax.toString().split(".")[1].length == 1
          ? `${floatTax.toString()}0`
          : floatTax.toString()
      );
    }
    setTotal((sum + shipping + floatTax).toFixed(2));
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
      {/** Page Title */}
      <div className="flex flex-row place-content-center text-4xl text-siteRed py-11">
        Checkout
      </div>
      {/** Checkout section */}
      <section className="flex flex-row place-content-center">
        <div className="flex flex-col place-items-center place-content-center">
          <form
            className="flex flex-col gap-y-12"
            onSubmit={() => {}}
            id="order-form"
          >
            {/** Delivery information */}
            <div className="flex flex-col gap-y-5 w-96">
              <div className="flex flex-row font-libreFranklin text-xl text-siteGray">
                Delivery Information
              </div>
              {/** Name */}
              <InputFieldLong placeholder="Name" />

              {/** Address 1 */}
              <InputFieldLong placeholder="Address 1" />

              {/** Address 2 */}
              <InputFieldLong placeholder="Address 2" />

              {/** City and Zip */}
              <div className="flex flex-row place-content-start w-full">
                <CityField />
                <div className="grow"></div>
                <ZipCodeField />
              </div>

              {/** State */}
              <StateField />
            </div>

            {/** Payment */}
            <div className="flex flex-col gap-y-5 w-96">
              <div className="flex flex-row font-libreFranklin text-xl text-siteGray">
                Payment
              </div>

              {/** Payment types */}
              <div className="grid grid-cols-3 place-items-star gap-3">
                <motion.button
                  className={`w-24 h-8 font-libreFranklin ${
                    paymentType == "apple-pay" ? "bg-siteBlue" : "bg-inputBg"
                  } text-sm`}
                  onClick={(event) => {
                    event.preventDefault();
                    setPaymentType("apple-pay");
                  }}
                >
                  Apple Pay
                </motion.button>

                <motion.button
                  className={`w-24 h-8 font-libreFranklin ${
                    paymentType == "google-pay" ? "bg-siteBlue" : "bg-inputBg"
                  } text-sm`}
                  onClick={(event) => {
                    event.preventDefault();
                    setPaymentType("google-pay");
                  }}
                >
                  Google Pay
                </motion.button>

                <motion.button
                  className={`w-24 h-8 font-libreFranklin ${
                    paymentType == "cc" ? "bg-siteBlue" : "bg-inputBg"
                  } text-sm`}
                  onClick={(event) => {
                    event.preventDefault();
                    setPaymentType("cc");
                  }}
                >
                  CC
                </motion.button>

                <motion.button
                  className={`w-24 h-8 font-libreFranklin ${
                    paymentType == "pay-pal" ? "bg-siteBlue" : "bg-inputBg"
                  } text-sm`}
                  onClick={(event) => {
                    event.preventDefault();
                    setPaymentType("pay-pal");
                  }}
                >
                  Pay Pal
                </motion.button>
              </div>

              {/** CC Payment Section */}
              {paymentType == "cc" ? (
                <div className="flex flex-col gap-y-5 w-96">
                  {/** Name of card */}
                  <InputFieldLong placeholder="Name on card" />

                  {/** Credit Card # */}
                  <InputFieldLong placeholder="Credit Card #" />

                  <div className="grid grid-cols-3 place-items-star gap-3">
                    {/** CVV */}
                    <CvvField />

                    {/** Expiry Date */}
                    <ExpiryDateFields />
                  </div>

                  <ZipCodeField />
                </div>
              ) : (
                <></>
              )}
            </div>

            {/** CC Billing Information */}
            {paymentType == "cc" ? (
              <div className="flex flex-col gap-y-5 w-96">
                <div className="flex flex-row font-libreFranklin text-xl text-siteGray">
                  Billing Information
                </div>
                {/** Name */}
                <InputFieldLong placeholder="Name" />

                {/** Address 1 */}
                <InputFieldLong placeholder="Address 1" />

                {/** Address 2 */}
                <InputFieldLong placeholder="Address 2" />

                {/** City and Zip */}
                <div className="flex flex-row place-content-start w-full">
                  <CityField />
                  <div className="grow"></div>
                  <ZipCodeField />
                </div>

                {/** State */}
                <StateField />
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>

        <div className="grow"></div>

        <div className="flex flex-col place-items-center">
          {/** Order box */}
          <div className="flex flex-col p-6 gap-y-6 bg-siteLightGray h-fit">
            <div className="flex flex-row font-libreFranklin text-lg">
              Order
            </div>
            {mangas.length == 0 ? (
              <div>No manga was added to the cart</div>
            ) : (
              <div className="flex flex-col bg-white p-6 gap-y-2 w-80">
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
                    <div className="font-libreFranklin text-sm">
                      {`$${tax}`}
                    </div>
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
      </section>

      {/* <SectionDivider /> */}
    </div>
  );
}
