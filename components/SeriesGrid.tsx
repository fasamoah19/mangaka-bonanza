import { MangaSeries } from "@/lib/types";
import SeriesItem from "./SeriesItem";

/** Props necessary for the component */
type SeriesGridProps = {
  gridTitle: string;
  seriesList: MangaSeries[];
};

/**
 * Component that displays a grid for a list of series items
 * 
 * @param param0 SeriesGridProps
 * @returns SeriesGrid component
 */
export default function SeriesGrid({ gridTitle, seriesList }: SeriesGridProps) {
  return (
    <section className="flex flex-col">
      <div
        className={`flex flex-row place-content-center text-center text-2xl md:text-4xl text-siteRed pb-16`}
      >
        {gridTitle}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-16 md:gap-x-8 lg:gap-x-14">
        {seriesList.map((singleSeries) => (
          <SeriesItem singleSeries={singleSeries} />
        ))}
      </div>
    </section>
  );
}
