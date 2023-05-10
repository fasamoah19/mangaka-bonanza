import { strapiFetch } from "@/lib/custom-functions";
import { MangaSeries } from "@/lib/types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const genre = context.params?.genre;
  const query = qs.stringify(
    {
      filters: {
        genres: {
          $contains: genre,
        },
      },
      sort: ["name"],
      populate: {
        firstCover: true,
        mangaka: true,
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await strapiFetch(
    process.env.NEXT_PUBLIC_STRAPI_API_MANGA_SERIES_PATH!,
    query
  );

  const mangaObjects = await response.json();
  const data = mangaObjects.data as MangaSeries[];

  return {
    props: {
      genre: genre,
      series: data,
    },
  };
}

export default function SelectedGenre({
  genre,
  series,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const titleColor = "text-siteRed";
  return (
    <div className="flex flex-col pb-8">
      <div className="mt-16">
        <section className="flex flex-col">
          <div
            className={`flex flex-row place-content-center text-4xl ${titleColor} pb-16`}
          >
            {genre}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-16 md:gap-x-8 lg:gap-x-14">
            {series.map((singleSeries) => (
              <Link href={`/series/${singleSeries.attributes?.slug}`} key={singleSeries.attributes?.name}>
                <div
                  className="flex flex-col w-52 h-112 bg-mangaCard shadow-md"
                >
                  <div>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${
                        singleSeries.attributes?.firstCover.data.attributes?.url
                      }`}
                      width={208}
                      height={288}
                      alt={
                        singleSeries.attributes?.firstCover.data.attributes
                          ?.alternativeText ?? ""
                      }
                    />
                    <div className="flex flex-col py-5 text-sm px-2 space-y-2">
                      <div className="text-sm font-semibold">
                        {singleSeries.attributes?.name}
                      </div>
                      <div className="text-xs">{`By: ${singleSeries.attributes?.mangaka.data.attributes?.name}`}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
