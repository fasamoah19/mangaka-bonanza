export const strapiFetch = async (path: string, query: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL!}${path}?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY!}`,
      },
    }
  );

}