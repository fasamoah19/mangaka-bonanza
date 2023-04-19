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
      <div className="pb-12 px-8">
        <Header />
        <Banner />
        <main className="relative">{children}</main>
      </div>
      <Footer />
    </>
  );
}

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
