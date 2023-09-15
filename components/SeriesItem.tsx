import { MangaSeries, Mangaka } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "./Tooltip";
import { transformImageLink } from "@/lib/custom-functions";

/** Props necessary for the component */
type SeriesItemProps = {
  singleSeries: MangaSeries;
};

/**
 * Single series object that is displayed in the SeriesGrid
 *
 * @param param0 SeriesItemProps
 * @returns SeriesItem component
 */
export default function SeriesItem({ singleSeries }: SeriesItemProps) {
  return (
    <Link
      href={`/series/${singleSeries?.slug}`}
      key={singleSeries?.name}
    >
      <div className="flex flex-col w-52 h-112 bg-mangaCard shadow-md">
        <div>
          <Image
            src={transformImageLink(singleSeries?.first_cover_url ?? "", 208, 288)}
            width={208}
            height={288}
            alt={`${singleSeries?.name} First Manga Cover`}
          />
          <div className="flex flex-col py-5 text-sm px-2 space-y-2">
            <Tooltip label="View series" decreaseY>
              <div className="text-sm font-semibold">
                {singleSeries?.name}
              </div>
            </Tooltip>
            <Tooltip label="View mangaka" decreaseY>
              <div className="text-xs">{`By: ${(singleSeries.mangaka as unknown as Mangaka).name}`}</div>
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  );
}
