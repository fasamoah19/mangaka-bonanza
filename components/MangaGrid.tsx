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
      <div className={`flex flex-row place-content-center text-4xl ${titleColor} pb-16`}>
        {gridTitle}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-16 md:gap-x-8 lg:gap-x-14">
        {mangas.map((manga) => (
          <div key={manga.attributes?.name}>
            <MangaItem manga={manga} />
          </div>
        ))}
      </div>
    </section>
  );
}
