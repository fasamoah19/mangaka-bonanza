/** Necessary props for the component */
type InputFieldLongProps = {
  placeholder: string;
}

/**
 * Custom input field
 * 
 * @param props Placeholder text
 * @returns InputFieldLong component
 */
export default function InputFieldLong(props : InputFieldLongProps) {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-full">
      <input
        {...props}
        type="text"
        className="bg-transparent pl-2 h-full w-full font-libreFranklin text-sm"
      />
    </div>
  );
}
