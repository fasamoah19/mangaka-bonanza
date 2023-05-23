import { CheckoutFormState, CheckoutFormAction } from "@/reducers/checkout_reducer";
import { Dispatch } from "react";

/** Necessary props for the component */
type CityFieldProps = {
  state: CheckoutFormState,
  dispatch: Dispatch<CheckoutFormAction>
  updateField: string;
}

/**
 * Custom input that takes in a city
 * 
 * @returns CityField component
 */
export default function CityField({ state, dispatch, updateField } : CityFieldProps) {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-44 md:w-52">
      <input
        type="text"
        placeholder="City"
        minLength={3}
        required
        maxLength={65336}
        pattern="[A-Za-z]"
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
