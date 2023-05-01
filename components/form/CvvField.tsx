import { CheckoutFormState, CheckoutFormAction } from "@/reducers/checkout_reducer";
import { Dispatch } from "react";

/** Necessary props for the component */
type CvvFieldProps = {
  state: CheckoutFormState,
  dispatch: Dispatch<CheckoutFormAction>
  updateField: string;
}

/**
 * Custom field that takes in a CVV number for a credit card
 * 
 * @returns CvvField component
 */
export default function CvvField({ state, dispatch, updateField} : CvvFieldProps) {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-24">
      <input
        type="password"
        maxLength={4}
        minLength={4}
        pattern="\d*"
        placeholder="CVV"
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
