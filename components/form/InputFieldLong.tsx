import { CheckoutFormAction, CheckoutFormState } from "@/reducers/checkout_reducer";
import { Dispatch } from "react";

/** Necessary props for the component */
type InputFieldLongProps = {
  placeholder: string;
  state: CheckoutFormState,
  dispatch: Dispatch<CheckoutFormAction>
  updateField: string;
}

/**
 * Custom input field
 * 
 * @param props Placeholder text
 * @returns InputFieldLong component
 */
export default function InputFieldLong(props : InputFieldLongProps) {
  const { state, dispatch, updateField, ...htmlAttributes } = props
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-full">
      <input
        {...htmlAttributes}
        type="text"
        required={updateField.includes('AddressTwo') ? false : true}
        minLength={2}
        maxLength={65336}
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
