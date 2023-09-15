import HeadComponent from "@/components/HeadComponent";
import OrderSummary from "@/components/OrderSummary";
import CityField from "@/components/form/CityField";
import CvvField from "@/components/form/CvvField";
import ExpiryDateFields from "@/components/form/ExpiryDateFields";
import InputFieldLong from "@/components/form/InputFieldLong";
import StateField from "@/components/form/StateField";
import ZipCodeField from "@/components/form/ZipCodeField";
import { useCartContext } from "@/context/CartContextProvider";
import { getMangas, getRecommended } from "@/lib/custom-functions";
import { Manga } from "@/lib/types";
import {
  checkoutInitialValues,
  checkoutReducer,
} from "@/reducers/checkout_reducer";
import { motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";

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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("apple-pay");

  const [state, dispatch] = useReducer(checkoutReducer, checkoutInitialValues);

  /** Updates the total displayed on the page */
  const updateTotal = () => {
    let sum = 0;
    let shipping = 5.0;
    mangas.map((manga) => {
      sum = sum + (manga?.price ?? 0);
    });
    let floatTax = parseFloat((sum * 0.06).toFixed(2));
    let finalTax = floatTax.toString();
    if (floatTax.toString().split(".").length > 1) {
      finalTax =
        floatTax.toString().split(".")[1].length == 1
          ? `${floatTax.toString()}0`
          : floatTax.toString();
    }

    dispatch({
      type: "update",
      payload: {
        ...state,
        tax: finalTax,
        total: (sum + shipping + floatTax).toFixed(2).toString(),
      },
    });
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
      setRecommended(recommendedData ?? []);
    };

    if (mangas.length == 0 && cart.length > 0) {
      getData();
    } else {
      if (recommended?.length == 0) {
        getRecommendedData();
      }
      setLoading(false);
      updateTotal();
    }

  }, [mangas]);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <HeadComponent
        title={"Checkout | Mangaka Bonanza"}
        description="Mangaka Bonanza checkout page"
      />
      <div className="flex flex-col mt-5">
        {/** Page Title */}
        <div className="flex flex-row place-content-center text-4xl text-siteRed py-11">
          Checkout
        </div>
        {/** Checkout section */}
        <section className="flex flex-col md:flex-row md:place-content-center place-items-center">
          <div className="flex flex-col md:place-items-center md:place-content-center">
            <form
              className="flex flex-col gap-y-12"
              onSubmit={(event) => {
                event.preventDefault();
              }}
              id="order-form"
            >
              {/** Delivery information */}
              <div className="flex flex-col gap-y-5 w-72 md:w-96">
                <div className="flex flex-row font-libreFranklin text-xl text-siteGray">
                  Delivery Information
                </div>
                {/** Name */}
                <InputFieldLong
                  placeholder="Name"
                  state={state}
                  dispatch={dispatch}
                  updateField="deliveryName"
                />

                {/** Address 1 */}
                <InputFieldLong
                  placeholder="Address 1"
                  state={state}
                  dispatch={dispatch}
                  updateField="deliveryAddress"
                />

                {/** Address 2 */}
                <InputFieldLong
                  placeholder="Address 2"
                  state={state}
                  dispatch={dispatch}
                  updateField="deliveryAddressTwo"
                />

                {/** City and Zip */}
                <div className="flex flex-row place-content-start md:w-full">
                  <CityField
                    state={state}
                    dispatch={dispatch}
                    updateField="deliveryCity"
                  />
                  <div className="grow"></div>
                  <ZipCodeField
                    state={state}
                    dispatch={dispatch}
                    updateField="deliveryZipCode"
                  />
                </div>

                {/** State */}
                <StateField
                  state={state}
                  dispatch={dispatch}
                  updateField="deliveryState"
                />
              </div>

              {/** Payment */}
              <div className="flex flex-col gap-y-5 w-72 md:w-96">
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
                  <div className="flex flex-col gap-y-5 w-72 md:w-96">
                    {/** Name of card */}
                    <InputFieldLong
                      placeholder="Name on card"
                      state={state}
                      dispatch={dispatch}
                      updateField="nameOnCard"
                    />

                    {/** Credit Card # */}
                    <InputFieldLong
                      placeholder="Credit Card #"
                      state={state}
                      dispatch={dispatch}
                      updateField="ccNumber"
                    />

                    <div className="grid grid-cols-3 place-items-star gap-3">
                      {/** CVV */}
                      <CvvField
                        state={state}
                        dispatch={dispatch}
                        updateField="cvv"
                      />

                      {/** Expiry Date */}
                      <ExpiryDateFields state={state} dispatch={dispatch} />
                    </div>

                    <ZipCodeField
                      state={state}
                      dispatch={dispatch}
                      updateField="cardZipCode"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/** CC Billing Information */}
              {paymentType == "cc" ? (
                <div className="flex flex-col gap-y-5 w-72 md:w-96">
                  <div className="flex flex-row font-libreFranklin text-xl text-siteGray">
                    Billing Information
                  </div>
                  {/** Name */}
                  <InputFieldLong
                    placeholder="Name"
                    state={state}
                    dispatch={dispatch}
                    updateField="billingName"
                  />

                  {/** Address 1 */}
                  <InputFieldLong
                    placeholder="Address 1"
                    state={state}
                    dispatch={dispatch}
                    updateField="billingAddress"
                  />

                  {/** Address 2 */}
                  <InputFieldLong
                    placeholder="Address 2"
                    state={state}
                    dispatch={dispatch}
                    updateField="billingAddressTwo"
                  />

                  {/** City and Zip */}
                  <div className="flex flex-row place-content-start w-72 md:w-full">
                    <CityField
                      state={state}
                      dispatch={dispatch}
                      updateField="billingCity"
                    />
                    <div className="grow"></div>
                    <ZipCodeField
                      state={state}
                      dispatch={dispatch}
                      updateField="billingZipCode"
                    />
                  </div>

                  {/** State */}
                  <StateField
                    state={state}
                    dispatch={dispatch}
                    updateField="billingState"
                  />
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>

          <div className="grow pb-6 md:pb-0"></div>

          {/** Order Box */}
          <OrderSummary mangas={mangas} tax={state.tax} total={state.total} />
        </section>

        {/* <SectionDivider /> */}
      </div>
    </>
  );
}
