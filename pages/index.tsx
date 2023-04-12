import { Libre_Barcode_128_Text } from "next/font/google";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Manga } from "@/lib/types";

const libreBarcode = Libre_Barcode_128_Text({ subsets: ["latin"], weight: "400"})

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL!}/api/mangas?populate=mangaka,image`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY!}`,
    },
  });
  const mangas = await response.json();

  console.log(mangas);
  console.log(mangas?.data[0].attributes);

  return {
    props: {
      mangas: mangas.data as Manga[],
    },
  };
}

export default function Home({
  mangas,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <div>Hi There</div>
      <div>{mangas[0].attributes?.image.data.attributes?.url}</div>
      <div>Something?</div>
    </main>
  );
}
