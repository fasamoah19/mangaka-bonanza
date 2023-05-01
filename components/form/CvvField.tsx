/**
 * Custom field that takes in a CVV number for a credit card
 * 
 * @returns CvvField component
 */
export default function CvvField() {
  return (
    <div className="flex flex-row bg-inputBg place-items-center h-8 w-24">
      <input
        type="password"
        maxLength={4}
        minLength={4}
        placeholder="CVV"
        className="bg-transparent pl-2 h-full w-full font-libreFranklin text-sm"
      />
    </div>
  );
}
