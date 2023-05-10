/** Necessary props for this component */
type GenreTagProps = {
  genre: string;
};

/**
 * This component displays a custom tag used to display genres
 * 
 * @param param0 Genre string
 * @returns GenreTag component
 */
export default function GenreTag({ genre }: GenreTagProps) {
  return (
    <div
      className="shadow-md rounded-2xl w-fit h-9 px-4 bg-[#F2D398] flex place-items-center place-content-center font-libreFranklin text-[10px] sm:text-xs md:text-sm"
    >
      {genre}
    </div>
  );
}
