/**
 * Custom input that takes in a city
 * 
 * @returns CityField component
 */
export default function CityField() {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-52">
      <input
        type="text"
        placeholder="City"
        className="bg-transparent pl-2 h-full w-full font-libreFranklin text-sm"
      />
    </div>
  );
}
