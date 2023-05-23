import { CheckoutFormState, CheckoutFormAction } from "@/reducers/checkout_reducer";
import { Dispatch } from "react";

/** Necessary props for the component */
type ZipCodeFieldProps = {
  state: CheckoutFormState,
  dispatch: Dispatch<CheckoutFormAction>
  updateField: string;
}

/**
 * Custom component that takes in a ZipCode
 * 
 * @returns ZipCodeField component
 */
export default function ZipCodeField({ state, dispatch, updateField } : ZipCodeFieldProps) {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-20 md:w-28">
      <input
        type="text"
        maxLength={5}
        minLength={5}
        pattern="\d*"
        placeholder="Zip Code"
        className="bg-transparent pl-2 h-full w-full font-libreFranklin text-sm"
        onChange={(event) => {
          dispatch({
            type: 'update',
            payload: {
              ...state,
              [updateField]: event.currentTarget.value
            }
          })
        }}
      />
    </div>
  );
}
