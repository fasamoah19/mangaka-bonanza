import Head from "next/head";

type HeadComponentProps = {
  title: string
  description?: string
}

/**
 * Component that gives document information
 * 
 * @param param0 HeadComponentProps
 * @returns HeadComponent
 */
export default function HeadComponent({ title, description } : HeadComponentProps) {
  return (
    <Head>
      <meta httpEquiv="Content-type" content="text/html;charset=utf-8" />
      <meta charSet="utf-8" />
      <meta
        id="view"
        name="viewport"
        content="initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="keywords" content="Manga, Mangaka, Anime, Shop" />
      <meta
        name="description"
        content={
          description
            ? description
            : "Mangaka Bonanza is a one stop shop for your favorite manga."
        }
      />
      <meta
        name="twitter:description"
        content={
          description
            ? description
            : "Mangaka Bonanza is a one stop shop for your favorite manga."
        }
      />
            <meta
        property="og:description"
        content={
          description
            ? description
            : "Mangaka Bonanza is a one stop shop for your favorite manga."
        }
      />
      <meta property="og:title" content={title} />
      <title>{title}</title>

    </Head>
  );
}
