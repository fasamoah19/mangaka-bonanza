import Link from "next/link";

/**
 * Footer for the Mangaka Bonanza website
 *
 * @returns Footer component
 */
export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row bg-black py-16 px-20 place-items-center">
      <div className="flex flex-col md:flex-row gap-x-12">
        <div className="flex flex-col md:gap-y-4 gap-y-6 text-white place-items-center md:place-items-start">
          <Link href={"/"}>
            <div className="text-xs">Home</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">About</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">Contact</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">Help</div>
          </Link>
        </div>
        <div className="flex flex-row md:hidden place-items-center py-6">
          <div className="text-sm mr-2 text-white">©</div>
          <Link href="/">
            <h3 className="text-lg font-anton font-bold text-white">
              Mangaka Bonanza
            </h3>
          </Link>
        </div>
        <div className="flex flex-col md:gap-y-4 gap-y-6 text-white place-items-center md:place-items-start">
          <Link href={"#"}>
            <div className="text-xs">Terms of Service</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">Privacy Policy</div>
          </Link>
          <Link href={"#"}>
            <div className="text-xs">FAQ</div>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex md:grow"></div>
      <div className="hidden md:flex md:flex-row place-items-center">
        <div className="text-sm mr-2 text-white">©</div>
        <Link href="/">
          <h3 className="text-xl font-anton font-bold text-white">
            Mangaka Bonanza
          </h3>
        </Link>
      </div>
    </footer>
  );
}
