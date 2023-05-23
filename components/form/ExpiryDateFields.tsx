import {
  CheckoutFormState,
  CheckoutFormAction,
} from "@/reducers/checkout_reducer";
import { Dispatch } from "react";

/** Necessary props for the component */
type ExpiryDateFieldsProps = {
  state: CheckoutFormState;
  dispatch: Dispatch<CheckoutFormAction>;
};

/**
 * Custom component that allows a user to select the expiration date for a credit
 * card
 *
 * @returns ExpiryDateFields component
 */
export default function ExpiryDateFields({
  state,
  dispatch,
}: ExpiryDateFieldsProps) {
  return (
    <div className="flex flex-row gap-x-4">
      <select
        name="expireMM"
        id="expireMM"
        required
        onChange={(event) => {
          dispatch({
            type: "update",
            payload: {
              ...state,
              expiryMonth: event.currentTarget.value,
            },
          });
        }}
      >
        <option value="">Month</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <select
        name="expireYY"
        id="expireYY"
        required
        onChange={(event) => {
          dispatch({
            type: "update",
            payload: {
              ...state,
              expiryYear: event.currentTarget.value,
            },
          });
        }}
      >
        <option value="">Year</option>
        <option value="23">2023</option>
        <option value="24">2024</option>
        <option value="25">2025</option>
        <option value="26">2026</option>
        <option value="27">2027</option>
        <option value="28">2028</option>
      </select>
    </div>
  );
}
