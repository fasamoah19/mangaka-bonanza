/**
 * Custom component that takes in a ZipCode
 * 
 * @returns ZipCodeField component
 */
export default function ZipCodeField() {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-28">
      <input
        type="text"
        maxLength={5}
        minLength={5}
        placeholder="Zip Code"
        className="bg-transparent pl-2 h-full w-full font-libreFranklin text-sm"
      />
    </div>
  );
}
