import Footer from "./Footer";
import Header from "./Header";

/**
 * Props that the Layout component receives
 *
 * @param children - JSX for the pages that will be displayed in this Layout
 * component
 */
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="pb-16 px-8">
        <Banner />
        <main className="relative">{children}</main>
      </div>
      <Footer />
    </>
  );
}

/** Component that displays the banner of kid goku underneath the header */
const Banner = () => {
  return (
    <div className="flex py-3">
      {/** Banner */}
      <img
        src={"/banner.jpg"}
        className="object-cover w-full h-32 object-center-40-per"
      />
    </div>
  );
};
