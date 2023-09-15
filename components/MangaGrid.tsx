import { Manga } from "@/lib/types";
import MangaItem from "./MangaItem";

/** Props necessary for the component */
type MangaGridProps = {
  mangas: Manga[];
  gridTitle: string;
  titleColor: "text-siteGray" | "text-siteRed";
};

/**
 * Custom component that displays the Grid for manga items
 * 
 * @param param0 MangaGridProps
 * @returns MangaGrid component
 */
export default function MangaGrid({ mangas, gridTitle, titleColor }: MangaGridProps) {
  return (
    <section className="flex flex-col">
      <div className={`flex flex-row place-content-center text-center text-2xl md:text-4xl ${titleColor} pb-16`}>
        {gridTitle}
      </div>
      {/** Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 md:place-items-center md:gap-y-16 md:gap-x-8 lg:gap-x-14">
        {mangas.map((manga) => (
          <div key={manga?.name}>
            <MangaItem manga={manga} />
          </div>
        ))}
      </div>
      {/** Mobile Grid */}
      <div className="grid grid-cols-1 place-items-center gap-y-16 md:hidden">
        {mangas.slice(0, 4).map((manga) => (
          <div key={manga?.name}>
            <MangaItem manga={manga} />
          </div>
        ))}
      </div>
    </section>
  );
}
