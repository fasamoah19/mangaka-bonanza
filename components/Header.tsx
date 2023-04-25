import { Anton } from "next/font/google";
import UserIcon from "./icons/UserIcon";
import { useCartContext } from "@/context/CartContextProvider";
import Link from "next/link";

/** Font used for the logo */
const anton = Anton({ subsets: ["latin"], weight: "400" });

/**
 * Sticky Header component
 *
 * @returns Header componenet
 */
export default function Header() {
  const cart = useCartContext();
  return (
    <header className="sticky z-50 top-0 bg-white py-4 shadow-sm">
      <div className="flex flex-row px-8">
        <div className="flex">
          <Link href="/">
            <h3 className="text-3xl font-anton font-bold">Mangaka Bonanza</h3>
          </Link>
        </div>
        <div className="grow"></div> {/** Spacer */}
        <nav className="flex space-x-4 place-items-center">
          <ul className="flex flex-col md:flex-row space-x-6">
            <li>
              <Link className="text-sm" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-sm" href="#">
                Genres
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-sm">
                Cart
              </Link>
              {cart.length > 0 ? (
                <div className="rounded-full h-2 w-2 bg-siteRed absolute -translate-y-5 translate-x-6"></div>
              ) : (
                <></>
              )}
            </li>
            <li>
              <Link href="#" className="text-sm">
                About
              </Link>
            </li>
          </ul>

          <UserIcon />
        </nav>
      </div>
    </header>
  );
}
